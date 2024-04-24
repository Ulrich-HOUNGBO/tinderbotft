"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations/auth";
import { createAccount, createAccountCredentials } from "@/services/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "../ui/phone-input";
import { toast } from "../ui/use-toast";

type Credentials = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const { mutate, isPending } = useMutation({
		mutationKey: ["create-account"],
		mutationFn: (credentials: createAccountCredentials) => createAccount(credentials),
		onSuccess: () => {
			toast({
				title: "Compte créé avec succès",
				description: "Nous vous avons envoyé un e-mail pour vérifier votre compte.",
			});
		},
		onError: (error: any) => {
			console.log(error);
			toast({
				variant: "destructive",
				title: "Une erreur s'est produite",
				description: error.response.statusText,
			});
		},
	});

	const form = useForm<Credentials>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			phoneNo: "",
			prefix: "BJ+229",
			password: "",
			acceptTerms: undefined,
		},
		mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		// console.log(data);
		mutate({
			...data,
			phoneNo: `${data.prefix.substring(data.prefix.indexOf("+"))}${data.phoneNo?.replace(/\s/g, "")}`,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-3 md:gap-y-7">
				<div className="space-y-2 md:space-y-3">
					{/* Email field */}
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom d&apos;utilisateur</FormLabel>
								<FormControl>
									<Input placeholder="john52" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
					{/* PhoneNumber field */}
					<FormField
						control={form.control}
						name="phoneNo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Numéro de téléphone</FormLabel>
								<FormControl>
									<PhoneInput
										inputProps={field}
										eventProps={{
											value: form.watch("prefix"),
											onValueChange: (value) => {
												// console.log(value);
												form.setValue("prefix", value);
											},
										}}
									/>
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

					{/* Accept items field */}
					<FormField
						control={form.control}
						name="acceptTerms"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center space-x-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className="rounded border-primary"
										/>
									</FormControl>
									<label className="text-sm text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										J&apos;accepte les
										<Link href="/terms" className="pl-1 text-primary underline">
											conditions d&apos;utilisation
										</Link>
									</label>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isPending || !form.formState.isDirty || !form.formState.isValid} size="lg">
					{isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					S&apos;inscrire
					<span className="sr-only">register</span>
				</Button>
			</form>
		</Form>
	);
}
