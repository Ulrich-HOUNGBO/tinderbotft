import axios from "@/lib/axios";
import { UserInterface } from "@/types";

/**
 * Query to get a user messages
 * @returns {Promise<any>} - Object containing user messages
 */
export const getSmsByUserId = async (id: string): Promise<any> => {
	const response = await axios.get(`/messages/user/${id}`).then((data) => data);
	return response.data;
};

export interface sendSmsCredentials {
	from: string;
	to: string;
	message: string;
	pageNumber: string;
}

/**
 * Query to send a message
 *  @param credentials - Message data
 */
export const sendSms = async (credentials: sendSmsCredentials) => {
	const response = await axios.post("/messages", credentials);

	return response.data;
};
