import { z } from "zod";

export const proxySchema = z.object({
  name: z
    .string({
      required_error: "Proxy name is required",
    })
    .min(1, "Proxy name cannot be empty"), // Vérifie que le champ n'est pas vide
  host: z
    .string({
      required_error: "Proxy host is required",
    })
    .min(1, "Proxy host cannot be empty"), // Vérifie que le champ n'est pas vide
  port: z
    .number({
      required_error: "Proxy port is required",
    })
    .positive("Port must be a positive number"), // S'assure que le port est un nombre positif
  username: z
    .string({
      required_error: "Proxy username is required",
    })
    .min(1, "Proxy username cannot be empty"), // Vérifie que le champ n'est pas vide
  password: z
    .string({
      required_error: "Proxy password is required",
    })
    .min(1, "Proxy password cannot be empty"), // Vérifie que le champ n'est pas vide
  rotation_link: z.string().optional(), // Ce champ reste optionnel
});

export type ProxySchemaType = z.infer<typeof proxySchema>;
