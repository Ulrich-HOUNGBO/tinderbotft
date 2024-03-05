"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

type Credentials = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
	const { pending: isPending } = useFormStatus();

	const form = useForm<Credentials>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		console.log(data);
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
					Send reset password link
					<span className="sr-only">Send reset password link</span>
				</Button>
				<div className="flex justify-end">
					<Link href={routes.auth.login} className="text-sm text-primary underline">
						Go back to login page
					</Link>
				</div>
			</form>
		</Form>
	);
}
