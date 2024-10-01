import * as z from "zod";

export const accountSchema = z.object({
  title: z
    .string({
      required_error: "A title is required",
    })
    .min(1, "Account name is required"), // Vérifie que le champ n'est pas vide
  modele: z
    .string({
      required_error: "A modele is required",
    })
    .min(1, "Model name is required"), // Vérifie que le champ n'est pas vide
  token: z
    .string({
      required_error: "A token is required",
    })
    .min(1, "Token is required"), // Vérifie que le champ n'est pas vide
  refresh_token: z.string().nullable(),
  strategy: z.string().optional(),
});
