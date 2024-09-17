import * as z from "zod";
import { TimeValue } from "react-aria";

const timeValueSchema = z.custom<TimeValue>(
  (val) => {
    return val instanceof Object && "hours" in val && "minutes" in val;
  },
  {
    message: "Invalid time value",
  },
);

export const botSchema = z
  .object({
    bot_name: z
      .string({
        required_error: "Nom du bot requis",
      })
      .min(3, {
        message: "Le nom du bot doit comporter au moins 3 caractères",
      }),
    token: z.string({
      required_error: "Le token du compte tinder est requis",
    }),
    proxy: z.string({
      required_error: "Le proxy est requis",
    }),
    swipe_times: z.number({
      required_error: "Le nombre de swipes est requis",
    }),
    right_swipe_percentage: z.number({
      required_error: "Le pourcentage de swipe à droite est requis",
    }),
    device_id: z.string().optional(),
    refresh_token: z.string().optional(),
    schedule_time: timeValueSchema.optional(),
  })
  .required();
