import * as z from "zod";

export const strategySchema = z.object({
  name: z.string({
    required_error: "Name of the strategy is required",
  }),

  description: z.string().optional(),

  days_number: z.number({
    required_error: "Number of days is required",
  }),

  proxy: z.string().optional(),
});
