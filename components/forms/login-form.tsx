"use client";

import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/config/validations/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

type Credentials = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();
	const [isPending, setIsPending] = React.useState(false);

	const form = useForm<Credentials>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: Credentials) => {
		console.log(data);
	};

	return (
		<div className="">
			<Form {...form}>
				<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-6">
					<div className="space-y-2">
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput placeholder="**********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Link href={"/forgot-password"} className="text-primary underline text-sm font-medium text-end">
						Forgot password ?
					</Link>

					<Button disabled={isPending || !form.formState.isDirty || !form.formState.isValid} size="lg">
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
						Login
						<span className="sr-only">Login</span>
					</Button>
				</form>
			</Form>
		</div>
	);
}
