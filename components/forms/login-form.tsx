"use client";

import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { loginSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type Credentials = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();

	const form = useForm<Credentials>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		const response = await signIn("credentials", {
			email: data.email,
			password: data.password,
			callbackUrl: routes.dashboard.home,
			redirect: false,
		});

		if (response?.error) {
			console.log(response);
			// TODO: change response error
			response.status === 401 &&
				toast({
					variant: "destructive",
					title: "Identifiants incorrects",
				});

			response.error === "Server Error !" &&
				toast({
					variant: "destructive",
					title: "Erreur serveur, veuillez réessayer plus tard",
				});
			return;
		}

		toast({
			title: "Connexion réussie",
		});
		router.push(response?.url ?? routes.dashboard.home);
	};

	return (
		<Form {...form}>
			<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-3 md:gap-y-7">
				<div className="space-y-2 md:space-y-3">
					{/* Email field */}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="johndoe@gmail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Password field */}
					<FormField
						control={form.control}
						name="password"
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
				</div>

				<div className="flex justify-end">
					<Link href={routes.auth.forgotPassword} className="text-sm text-primary underline dark:text-foreground/80">
						Mot de passe oublié ?
					</Link>
				</div>

				<Button disabled={form.formState.isSubmitting || !form.formState.isDirty || !form.formState.isValid} size="lg">
					{form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Se connecter
					<span className="sr-only">Se connecter</span>
				</Button>
			</form>
		</Form>
	);
}
