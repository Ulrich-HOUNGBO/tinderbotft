import * as z from "zod";

export const accountSchema = z.object({
  title: z.string({
    required_error: "A title is required",
  }),
  modele: z.string({
    required_error: "A modele is required",
  }),
  token: z.string({
    required_error: "A token is required",
  }),
  refresh_token: z.string().nullable(),
  strategy: z.string().optional(),
});
