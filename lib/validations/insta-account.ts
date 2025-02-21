import * as z from "zod";

export const connectInstaSchema = z.object({
  data: z.string().refine((value) => {
    const lines = value.split("\n");
    return lines.every(line => /^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(line) || /^[a-z0-9]+$/.test(line));
  }, {
    message: "Each line must be a valid email or alphanumeric string",
  }),
});
