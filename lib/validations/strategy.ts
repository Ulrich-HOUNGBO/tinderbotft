import * as z from "zod";

export const strategySchema = z.object({
  name: z.string({
    required_error: "Le nom de la stratégie est requis",
  }),

  description: z.string().optional(),

  days_number: z.number({
    required_error: "Le nombre de jours est requis",
  }),

  proxy: z.string().nullable(),
});
