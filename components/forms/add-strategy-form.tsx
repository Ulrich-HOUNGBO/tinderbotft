"use client";

import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useAddStrategy, useUpdateStrategy } from "@/services/strategy/hooks";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { strategySchema } from "@/lib/validations/strategy";
import { createStrategyCredentials } from "@/services/strategy/queries";
import { StrategyInterface } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProxies } from "@/services/proxy/hooks";

type Credentials = z.infer<typeof strategySchema>;
interface AddOrUpdateStrategyFormProps {
  mode: "add" | "update";
  initialData?: StrategyInterface;
}

export default function AddOrUpdateStrategyForm({
  mode,
  initialData,
}: Readonly<AddOrUpdateStrategyFormProps>) {
  const router = useRouter();
  const addMutation = useAddStrategy();
  const updateMutation = useUpdateStrategy(initialData?.id ?? "");
  const { data: proxies = [], isLoading, isError } = useProxies();

  const form = useForm<Credentials>({
    resolver: zodResolver(strategySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      days_number: initialData?.days_number ?? 0,
      proxy:
        typeof initialData?.proxy === "object"
          ? initialData?.proxy?.id
          : initialData?.proxy ?? undefined,
    },
    mode: "all",
  });

  const onSubmit = async (data: Credentials) => {
    if (mode === "add") {
      await addMutation.mutateAsync(data as createStrategyCredentials, {
        onSuccess: async () => {
          toast({
            title: "Stratégie créée avec succès",
          });
          router.push(routes.dashboard.strategy.index);
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Une erreur s'est produite",
            description: error.response.data,
          });
        },
      });
    } else {
      await updateMutation.mutateAsync(data as createStrategyCredentials, {
        onSuccess: async () => {
          toast({
            title: "Stratégie mise à jour avec succès",
          });
          router.push(routes.dashboard.strategy.index);
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Une erreur s'est produite",
            description: error.response.data,
          });
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="grid max-w-2xl gap-4 md:gap-7"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la stratégie</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de la stratégie" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
          <FormField
            control={form.control}
            name="days_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de jours</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nombre de jours"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proxy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proxy</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selectionner un proxy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Proxy</SelectLabel>
                        {proxies.map((proxy) => (
                          <SelectItem key={proxy.id} value={proxy.id}>
                            {proxy.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
          <Button
            disabled={addMutation.isPending || updateMutation.isPending}
            className="w-fit"
          >
            {(addMutation.isPending || updateMutation.isPending) && (
              <Loader2
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            {mode === "add"
              ? "Ajouter une stratégie"
              : "Mettre à jour la stratégie"}
            <span className="sr-only">
              {mode === "add"
                ? "Ajouter une stratégie"
                : "Mettre à jour la stratégie"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
