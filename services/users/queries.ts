import axios from "@/lib/axios";
import { StatsInterface, UserInterface } from "@/types";

/**
 * Query to get user profile information
 * @returns {Promise<UserInterface>} - Object containing user information:
 */
export const getMe = async (): Promise<UserInterface> => {
	const response = await axios.get("/users/profile").then((data) => data);
	// console.log(response);
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
 * @param id - User id
 * @param credentials - User data
 * @returns {Promise<UserInterface>} - Object containing user information:
 */
export const editProfile = async (id: string, credentials: createAccountCredentials): Promise<UserInterface> => {
	const response = await axios.put(`/users${id}`, credentials).then((data) => data);
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
	// console.log(response);
	return response.data;
};

/**
 * Query to get user stats
 * @returns {Promise<StatsInterface>} - Object containing user stats
 */
export const getUserStats = async (): Promise<StatsInterface[]> => {
	const response = await axios.get("/users/home/dashboard");
	// console.log(response);
	return response.data;
};
