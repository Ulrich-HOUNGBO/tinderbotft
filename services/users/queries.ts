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
 * Query to update user profile information
 * @returns {Promise<UserInterface>} - Object containing user information:
 */
export const editProfile = async (id: string): Promise<UserInterface> => {
	const response = await axios.put(`/users${id}`).then((data) => data);
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
