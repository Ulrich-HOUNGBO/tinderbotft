import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse mail valide	",
  }),
  password: z.string().min(1, {
    message: "Mot de passe requis",
  }),
});

export const registerSchema = z
  .object({
    username: z.string().min(2, {
      message: "Le nom d'utilisateur doit contenir au moins 2 caractères",
    }),
    email: z.string().email({
      message: "Veuillez entrer une adresse mail valide",
    }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message:
          "Vous devez accepter les conditions d'utilisation et la politique de confidentialité",
      }),
    }),
  })
  .required();

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse mail valide",
  }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .max(50)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*])(?=.{8,})/, {
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      }),
    confirmPassword: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
