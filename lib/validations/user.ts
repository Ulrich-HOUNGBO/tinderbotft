import { z } from "zod";

export const updateProfileSchema = z
	.object({
		username: z.string().min(2, {
			message: "Le nom d'utilisateur doit contenir au moins 2 caractères",
		}),
		email: z.string().email({
			message: "Veuillez entrer une adresse mail valide",
		}),
		phoneNo: z
			.string()
			.min(8, {
				message: "Le numéro de téléphone doit contenir au moins 8 chiffres",
			})
			.max(15, {
				message: "Le numéro de téléphone doit contenir au plus 15 chiffres",
			})
			.regex(/^[0-9]+$/, {
				message: "Le numéro de téléphone doit contenir uniquement des chiffres",
			}),
	})
	.required();
