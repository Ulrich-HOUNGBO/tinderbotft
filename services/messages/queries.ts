import axios from "@/lib/axios";
import { SmsInterface } from "@/types";

/**
 * Query to get all messages
 * @returns {Promise<SmsInterface[]>} - List of messages
 */
export const getAllSms = async (): Promise<SmsInterface[]> => {
	const response = await axios.get("/messages").then((data) => data);
	return response.data;
};

/**
 * Query to get a user messages
 * @returns {Promise<SmsInterface[]>} - Object containing user messages
 */
export const getSmsByUserId = async (id: string, page: string): Promise<SmsInterface[]> => {
	const response = await axios.get(`/messages/user/${id}?page=${page}`).then((data) => data);
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
