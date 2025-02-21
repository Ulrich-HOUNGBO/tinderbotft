import * as z from "zod";

export const createInstaAccountSchema = z.object({
  username: z.string().min(1, "Username is required"),
  fullName: z.string().optional(),
  externalUrl: z.string().url().optional(),
  biography: z.string().optional(),
  profilePicture: z.string().optional(),
  settingsFile: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  modeleId: z.string().optional(),
});