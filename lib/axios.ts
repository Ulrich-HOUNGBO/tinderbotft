import axios from "axios";
import { getSession, signOut } from "next-auth/react";

/**
 * axios request interceptors
 */
axios.interceptors.request.use(async (config) => {
	config.baseURL = process.env.NEXT_PUBLIC_API_URL!;
	config.headers["Content-Type"] = "application/json";
	config.withCredentials = false;

	const session = await getSession();

	if (session) config.headers.Authorization = `Bearer ${session?.accessToken}`;

	return config;
});

/**
 * axios response interceptors
 */
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 401) signOut({ callbackUrl: "/" });
		return Promise.reject(error);
	}
);

export default axios;
