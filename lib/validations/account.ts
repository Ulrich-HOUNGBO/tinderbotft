import * as z from "zod";

export const accountSchema = z.object({
  title: z.string({
    required_error: "Le nom du compte est requis",
  }),
  modele: z.string({
    required_error: "La modèle est requis",
  }),
  token: z.string({
    required_error: "Le token est requis",
  }),
  refresh_token: z.string().nullable(),
  strategy: z.string().nullable(),
});
