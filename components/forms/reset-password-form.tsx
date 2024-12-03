"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { routes } from "@/lib/routes";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { useResetPassword } from "@/services/accounts/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "../password-input";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type Credentials = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const token = useSearchParams().get("token");
  const uid = useSearchParams().get("uid");
  if (!token || !uid) redirect(routes.auth.login);
  const router = useRouter();
  const { isPending, mutate } = useResetPassword(
    token as string,
    uid as string,
  );

  const form = useForm<Credentials>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = async (data: Credentials) => {
    // console.log(data);

    mutate(
      {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: async (response: any) => {
          await toast({
            title:
              response.message ??
              "Votre mot de passe a été réinitialisé avec succès",
          });
          router.push(routes.auth.login);
          // console.log(response.message);
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: error.response.data.message ?? "Une erreur s'est produite",
          });
          // console.log(error.response.data.message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="grid gap-y-3 md:gap-y-7"
      >
        <div className="space-y-2 md:space-y-3">
          {/* New Password field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="**********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          disabled={
            isPending || !form.formState.isDirty || !form.formState.isValid
          }
          size="lg"
        >
          {isPending && (
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
          )}
          Réinitialiser mon mot de passe
          <span className="sr-only">Réinitialiser mon mot de passe</span>
        </Button>
      </form>
    </Form>
  );
}
