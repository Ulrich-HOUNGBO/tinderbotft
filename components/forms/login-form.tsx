"use client";

import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { loginSchema } from "@/lib/validations/login-schema";

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
    mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		console.log(data);
	};

	return (
		<div>
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<PasswordInput placeholder="**********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Link href={"/forgot-password"} className="text-primary underline text-sm text-end">
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
