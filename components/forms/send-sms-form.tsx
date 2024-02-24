"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { smsSchema } from "@/lib/validations/sms";
import { createAccount, createAccountCredentials } from "@/services/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

type Credentials = z.infer<typeof smsSchema>;

export default function SendSmsForm() {
	const { mutate, isPending } = useMutation({
		mutationKey: ["send-sms"],
		mutationFn: (credentials: createAccountCredentials) => createAccount(credentials),
		onSuccess: () => {
			toast({
				title: "Account created successfully",
				description: "We've sent you an email to verify your account.",
			});
		},
		onError: (error: Error) => {
			console.log(error);
		},
	});

	const form = useForm<Credentials>({
		resolver: zodResolver(smsSchema),
		defaultValues: {
			from: "",
			to: "",
			prefix: "+229",
			message: "",
			pageNumber: 0,
		},
		mode: "onChange",
	});

	const onSubmit = async (data: Credentials) => {
		console.log(data);
		// return;
		// mutate(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className="grid gap-y-3 md:gap-y-7">
				<div className="space-y-2 md:space-y-3">
					{/* Sender's name field */}
					<FormField
						control={form.control}
						name="from"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sender&apos;s name</FormLabel>
								<FormControl>
									<Input placeholder="Josh" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Receiver's phone number field */}
					<FormField
						control={form.control}
						name="to"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Receiver&apos;s phone number</FormLabel>
								<FormControl>
									<PhoneInput
										inputProps={field}
										eventProps={{
											value: form.watch("prefix"),
											onValueChange: (value) => form.setValue("prefix", value),
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Message content field */}
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea placeholder="Your message" {...field} rows={5} />
								</FormControl>
								<FormMessage />
								<p>{form.watch("message").length} character</p>
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isPending}>
					{isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Send SMS
					{!isPending && <Send className="ml-2 size-4" aria-hidden="true" />}
					<span className="sr-only">Send sms</span>
				</Button>
			</form>
		</Form>
	);
}
