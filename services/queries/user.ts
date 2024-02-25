import axios from "@/lib/axios";
import { UserInterface } from "@/types";

/**
 * Query to get user profile information
 * @returns {Promise<UserInterface>} - Object containing user information:
 */
export const getMe = async (): Promise<UserInterface> => {
	const response = await axios.get("/users/profile").then((data) => data);
	return response.data;
};

export interface createAccountCredentials {
	username: string;
	email: string;
	phoneNo?: string;
	password: string;
}

/**
 * Query to create account
 *  @param credentials - User data
 */
export const createAccount = async (credentials: createAccountCredentials) => {
	const response = await axios.post("/users/register", credentials);

	return response.data;
};

/**
 * Query to confirm user email
 * @param token - User token
 */
export const confirmEmail = async (token: string) => {
	const response = await axios.get(`/users/confirmation/${token}`);

	return response.data;
};

/**
 * Query to request a password reset link
 * @param email - User email
 */

export const forgotPassword = async (email: string) => {
	const response = await axios.post("/users/reset-password", { email });

	return response.data;
};
