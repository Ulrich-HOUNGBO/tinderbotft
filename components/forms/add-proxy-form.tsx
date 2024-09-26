"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { proxySchema } from "@/lib/validations/proxy";
import { createProxyCredentials } from "@/services/proxy/queries";
import { useAddProxy, useUpdateProxy } from "@/services/proxy/hooks";
import { routes } from "@/lib/routes";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { ProxyInterface } from "@/types";

type Credentials = z.infer<typeof proxySchema>;

interface ProxyFormProps {
  mode: "add" | "update";
  initialData?: ProxyInterface;
}

export default function AddOrUpdateProxyForm({
  mode,
  initialData,
}: ProxyFormProps) {
  const router = useRouter();
  const addMutation = useAddProxy();
  const updateMutation = useUpdateProxy(initialData?.id ?? "");

  const form = useForm<Credentials>({
    resolver: zodResolver(proxySchema),
    defaultValues: {
      name: initialData?.name ?? "",
      host: initialData?.host ?? "",
      port: initialData?.port ?? 0,
      username: initialData?.username ?? "",
      password: initialData?.password ?? "",
      rotation_link: initialData?.rotation_link ?? "",
    },
    mode: "all",
  });

  const onSubmit = async (data: Credentials) => {
    if (mode === "add") {
      await addMutation.mutateAsync(data as createProxyCredentials, {
        onSuccess: async () => {
          toast({ title: "Proxy ajouté avec succès" });
          router.push(routes.dashboard.proxy.index);
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
      await updateMutation.mutateAsync(data as createProxyCredentials, {
        onSuccess: async () => {
          toast({ title: "Proxy mis à jour avec succès" });
          router.push(routes.dashboard.proxy.index);
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
        <div className="grid grid-cols-1 gap-4 md:gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du proxy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hôte</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse de l'hôte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Port"
                    {...field}
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="Nom d'utilisateur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:gap-7">
          <FormField
            control={form.control}
            name="rotation_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lien de rotation</FormLabel>
                <FormControl>
                  <Input placeholder="Lien de rotation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={addMutation.isPending || updateMutation.isPending}
          className="w-fit"
        >
          {(addMutation.isPending || updateMutation.isPending) && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
          )}
          {mode === "add" ? "Ajouter Proxy" : "Mettre à jour Proxy"}
          <span className="sr-only">
            {mode === "add" ? "Ajouter Proxy" : "Mettre à jour Proxy"}
          </span>
        </Button>
      </form>
    </Form>
  );
}
