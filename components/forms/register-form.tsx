"use client";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Credentials = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const router = useRouter();
	const [isPending, setIsPending] = React.useState(false);

	const form = useForm<Credentials>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			phoneNumber: "",
			password: "",
			// confirmPassword: "",
			acceptTerms: undefined,
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
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
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
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone number</FormLabel>
									<FormControl>
										<Input type="number" placeholder="12345678" {...field} />
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
						{/* Confirm Password field */}
						{/* <FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm your password</FormLabel>
									<FormControl>
										<PasswordInput placeholder="**********" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
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
										<label className="text-gray-700 text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											I agree
											<Link href="/terms" className="text-primary underline pl-1">
												with terms and conditions.
											</Link>
										</label>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button disabled={isPending || !form.formState.isDirty || !form.formState.isValid} size="lg">
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
						Create account
						<span className="sr-only">register</span>
					</Button>
				</form>
			</Form>
		</div>
	);
}
