import * as z from "zod";

export const proxySchema: z.ZodType<{
    name: string;
    host: string;
    username: string;
    password: string;
}> = z.object({
    name: z
        .string({
            required_error: "Nom du proxy requis",
        })
        .min(3, {
            message: "Le nom du proxy doit comporter au moins 3 caractères",
        }),
    host: z
        .string({
            required_error: "L'adresse du proxy est requise",
        }),
    username: z
        .string({
            required_error: "Le nom d'utilisateur du proxy est requis",
        }),
    password: z
        .string({
            required_error: "Le mot de passe du proxy est requis",
        }),
});