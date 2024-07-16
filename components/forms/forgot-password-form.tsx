"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { routes } from "@/lib/routes";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useForgotPassword } from "@/services/accounts/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Credentials = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
	const { mutate, isPending } = useForgotPassword();
	const router = useRouter();

	const form = useForm<Credentials>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
		mode: "all",
	});

	const onSubmit = async (data: Credentials) => {
		// console.log(data);
		mutate(data.email, {
			onSuccess: async (response: any) => {
				await toast({
					title: response.message ?? "Nous vous avons envoyé un e-mail pour réinitialiser votre mot de passe",
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
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-3 md:gap-y-7">
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

				<Button disabled={isPending || !form.formState.isDirty || !form.formState.isValid} size="lg">
					{isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Envoyer
					<span className="sr-only">Envoyer le lien de réinitialisation</span>
				</Button>
				<div className="flex justify-end">
					<Link href={routes.auth.login} className="text-sm text-primary underline dark:text-foreground/80">
						Aller à la page de connexion
					</Link>
				</div>
			</form>
		</Form>
	);
}
