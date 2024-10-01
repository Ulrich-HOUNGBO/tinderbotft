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
      port: initialData?.port ? Number(initialData.port) : 0, // Convert port to number
      username: initialData?.username ?? "",
      password: initialData?.password ?? "",
      rotation_link: initialData?.rotation_link ?? "",
    },
    mode: "all",
  });

  const onSubmit = async (data: Credentials) => {
    const payload = {
      ...data,
      port: Number(data.port),
    };

    if (mode === "add") {
      await addMutation.mutateAsync(payload as createProxyCredentials, {
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
      await updateMutation.mutateAsync(payload as createProxyCredentials, {
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="proxy name" {...field} />
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
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="host" {...field} />
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="rotation_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rotation Link</FormLabel>
              <FormControl>
                <Input placeholder="rotation link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={addMutation.isPending || updateMutation.isPending}
          className="w-fit"
        >
          {(addMutation.isPending || updateMutation.isPending) && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
          )}
          {mode === "add" ? "Add Proxy" : "Update Proxy"}
          <span className="sr-only">
            {mode === "add" ? "Add Proxy" : "Update Proxy"}
          </span>
        </Button>
      </form>
    </Form>
  );
}
