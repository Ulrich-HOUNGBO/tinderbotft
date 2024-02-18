import axios from "@/lib/axios";

export const getMe = async () => {
	const response = await axios.get(`/users/profile`).then((data) => data);
	return response.data;
};
