"use server";

import axios from "@/lib/axios";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { UserInterface } from "@/types";

/**
 * Query to get user profile information
 * @returns {Promise<UserInterface>} - Object containing user information:
 */
export const getMe = cache(async (): Promise<UserInterface> => {
	const response = await axios.get("/users/profile").then((data) => data);
	return response.data;
});