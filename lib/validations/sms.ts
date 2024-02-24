import * as z from "zod";

export const smsSchema = z.object({
	from: z
		.string({
			required_error: "Sender name is required",
		})
		.min(3, {
			message: "Sender name must be at least 3 characters",
		})
		.max(15, {
			message: "Sender name must be at most 15 characters",
		}),
	prefix: z.string().min(2, {
		message: "Prefix must be at least 2 characters long",
	}),
	to: z
		.string({
			required_error: "Receiver's phone number is required",
		})
		.min(8, {
			message: "Receiver's phone number must be at least 8 characters long",
		})
		.max(15, {
			message: "Receiver's phone number must be at most 15 characters long",
		})
		.regex(/^[0-9]+$/, {
			message: "Receiver's phone number must be a number",
		}),
	message: z
		.string({
			required_error: "Message is required",
		})
		.min(1, {
			message: "Message is required",
		}),
	pageNumber: z
		.string({
			required_error: "Page number is required",
		})
		.transform((value) => Number(value)),
});
