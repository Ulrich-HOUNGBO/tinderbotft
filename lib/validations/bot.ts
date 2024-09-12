import * as z from "zod";

export const botSchema = z
    .object({
        bot_name: z
            .string({
                required_error: "Nom du bot requis",
            })
            .min(3, {
                message: "Le nom du bot doit comporter au moins 3 caractères",
            }),
        token: z
            .string({
                required_error: "Le token du compte tinder est requis",
            }),
        proxy: z
            .string({
                required_error: "Le proxy est requis",
            }),
        swipe_times: z
            .number({
                required_error: "Le nombre de swipes est requis",
            }),
        right_swipe_percentage: z
            .number({
                required_error: "Le pourcentage de swipe à droite est requis",
            }),
    })
    .required();
