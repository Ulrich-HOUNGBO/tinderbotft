import * as z from "zod";

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z.string().min(1, {
		message: "Password is required",
	}),
});

export const registerSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters long",
	}),
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(50)
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
			message:
				"Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
		}),
	prefix: z.string().min(2, {
		message: "Prefix must be at least 2 characters long",
	}),
	phoneNumber: z
		.string()
		.min(8, {
			message: "Phone must be at least 8 characters long",
		})
		.max(15, {
			message: "Phone number must be at most 15 characters long",
		})
		.regex(/^[0-9]+$/, {
			message: "Phone must be a number",
		})
		.optional(),
	acceptTerms: z.literal(true, {
		errorMap: () => ({
			message: "You must accept the terms and conditions",
		}),
	}),
});
