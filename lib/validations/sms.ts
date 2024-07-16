import * as z from "zod";

export const smsSchema = z
	.object({
		from: z
			.string({
				required_error: "Nom de l'expéditeur requis",
			})
			.min(3, {
				message: "Le nom de l'expéditeur doit comporter au moins 3 caractères",
			}),
		prefix: z.string().min(2, {
			message: "Le préfixe doit comporter au moins 2 caractères",
		}),
		to: z
			.string({
				required_error: "Numéro de téléphone du destinataire requis",
			})
			.min(8, {
				message: "Le numéro de téléphone du destinataire doit comporter au moins 8 chiffres",
			})
			.max(15, {
				message: "Le numéro de téléphone du destinataire doit comporter au plus 15 chiffres",
			})
			.regex(/^[0-9]+$/, {
				message: "Le numéro de téléphone du destinataire doit être composé de chiffres uniquement",
			}),
		message: z
			.string({
				required_error: "Message requis",
			})
			.min(1, {
				message: "Le message doit comporter au moins 1 caractère",
			}),
		pageNumber: z.string({
			required_error: "Nombre de caractère requis",
		}),
	})
	.required();
