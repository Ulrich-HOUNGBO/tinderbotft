"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { routes } from "@/lib/routes";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordInput } from "../password-input";
import { Button } from "../ui/button";

type Credentials = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
	const token = useSearchParams().get("token");
	if (!token) redirect(routes.auth.login);

	const { pending: isPending } = useFormStatus();

	const form = useForm<Credentials>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-3 md:gap-y-7">
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

				<Button disabled={isPending || !form.formState.isDirty || !form.formState.isValid} size="lg">
					{isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Réinitialiser mon mot de passe
					<span className="sr-only">Réinitialiser mon mot de passe</span>
				</Button>
			</form>
		</Form>
	);
}
