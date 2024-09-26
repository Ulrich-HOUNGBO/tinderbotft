import * as z from "zod";

export const proxySchema: z.ZodType<{
  name: string;
  host: string;
  username: string;
  password: string;
  port: number;
  rotation_link: string;
}> = z.object({
  name: z.string({
    required_error: "Nom du proxy requis",
  }),
  host: z.string({
    required_error: "L'adresse du proxy est requise",
  }),
  port: z.number({
    required_error: "Le port du proxy est requis",
  }),
  username: z.string({
    required_error: "Le nom d'utilisateur du proxy est requis",
  }),
  password: z.string({
    required_error: "Le mot de passe du proxy est requis",
  }),
  rotation_link: z.string({
    required_error: "Le lien de rotation est requis",
  }),
});
