import axios from "@/lib/axios";

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

/**
 * Query to reset user password
 * @param token - User token
 * @param password - New password
 */
export const resetPassword = async (token: string, password: string) => {
	const response = await axios.post(`/users/reset-password/${token}`, { password });
	return response.data;
};
