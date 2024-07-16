"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { smsSchema } from "@/lib/validations/sms";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { useSendMessage } from "@/services/messages/hooks";

type Credentials = z.infer<typeof smsSchema>;

export default function SendSmsForm() {
	const router = useRouter();
	const { mutateAsync, isPending } = useSendMessage();

	const form = useForm<Credentials>({
		resolver: zodResolver(smsSchema),
		defaultValues: {
			from: "",
			to: "",
			prefix: "BJ+229",
			message: "",
			pageNumber: "",
		},
		mode: "all",
	});

	useEffect(() => {
		form.setValue("pageNumber", form.watch("message").length.toString());
	});

	const onSubmit = async (data: Credentials) => {
		// console.log(data);
		await mutateAsync(
			{
				from: data.from.trim(),
				to: `${data.prefix.substring(data.prefix.indexOf("+"))}${data.to.replace(/\s/g, "")}`,
				message: data.message.trim(),
				pageNumber: data.pageNumber,
			},
			{
				onSuccess: async () => {
					await toast({
						title: "SMS envoyé avec succès",
					});
					router.push(routes.dashboard.sms.index);
				},
				onError: (error: any) => {
					// console.log(error);
					toast({
						variant: "destructive",
						title: "An error occurred",
						description: error.response.data,
					});
				},
			}
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
				className="grid max-w-2xl gap-y-3 md:gap-y-7"
			>
				<div className="space-y-2 md:space-y-3">
					{/* Sender's name field */}
					<FormField
						control={form.control}
						name="from"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom de l&apos;expéditeur</FormLabel>
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
								<FormLabel>Numéro de téléphone du destinataire</FormLabel>
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
									<Textarea placeholder="Votre message" {...field} rows={5} />
								</FormControl>
								<FormMessage />
								<div className="space-x-1">
									<span className="text-xs font-medium text-gray-400">{form.watch("message").length} caratère(s) </span>
									<span className="text-xs font-medium text-destructive">
										{form.watch("message").length > 80 &&
											form.watch("message").length <= 160 &&
											"20 crédits seront utilisés pour ce message"}
									</span>
									<span className="text-xs font-medium text-destructive">
										{form.watch("message").length > 160 &&
											form.watch("message").length <= 240 &&
											"30 crédits seront utilisés pour ce message"}
									</span>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<Button disabled={isPending} className="w-fit">
					{isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					Envoyer SMS
					{!isPending && <Send className="ml-2 size-4" aria-hidden="true" />}
					<span className="sr-only">Envoyer sms</span>
				</Button>
			</form>
		</Form>
	);
}
