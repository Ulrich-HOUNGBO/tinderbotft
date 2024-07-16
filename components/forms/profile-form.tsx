"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/contexts/auth/hook";
import { updateProfileSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Credentials = z.infer<typeof updateProfileSchema>;

export default function ProfileForm() {
	const { user, isLoading } = useAuth();

	const form = useForm<Credentials>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			username: user?.username ?? "",
			email: user?.email ?? "",
			phoneNo: user?.phoneNo ?? "",
		},
		mode: "all",
	});

	useEffect(() => {
		const fetchData = async () => {
			await form.reset({
				username: user?.username ?? "",
				email: user?.email ?? "",
				phoneNo: user?.phoneNo ?? "",
			});
		};
		fetchData();
	}, [form, user]);

	const onSubmit = async (data: Credentials) => {
		console.log(data);
	};

	return (
		<div className="space-y-10">
			<div className="flex items-center gap-x-3">
				<Avatar className="size-[5.5rem] border bg-slate-100/50">
					<AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.email}`} alt={user?.username} />
					<AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>

				<Button variant="ghost" className="rounded-full border">
					Modifier
				</Button>
			</div>

			<Form {...form}>
				<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="max-w-xl">
					<div className="mb-5 space-y-2 md:space-y-3">
						{/* Email field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="johndoe@gmail.com" {...field} readOnly />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-3 md:grid-cols-2">
							{/* Username field */}
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nom d&apos;utilisateur</FormLabel>
										<FormControl>
											<Input placeholder="john52" {...field} readOnly />
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
											<Input placeholder="+22912345678" {...field} readOnly />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button type="submit" disabled>
						Enregistrer
					</Button>
				</form>
			</Form>
		</div>
	);
}
