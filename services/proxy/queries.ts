import axios from "@/lib/axios";
import {ProxyInterface} from "@/types";


export const getAllProxies = async (): Promise<ProxyInterface[]> => {
    const response = await axios.get("/get-proxy/").then((data) => data);
    return response.data;
}

export const getProxyById = async (id: string): Promise<ProxyInterface> => {
    const response = await axios.get(`/get-proxies/${id}/`).then((data) => data);
    return response.data;
}

export interface createProxyCredentials {
    name: string;
    host: string;
    username: string;
    password: string;
}

export const addProxy = async (credentials: createProxyCredentials) => {
    const response = await axios.post("/create-proxy/", credentials);
    return response.data;
}

export const updateProxy = async (id: string, credentials: createProxyCredentials) => {
    const response = await axios.put(`/update-proxy/${id}/`, credentials);
    return response.data;
}

export const removeProxy = async (id: string) => {
    const response = await axios.delete(`/delete-proxy/${id}/`);
    return response.data;
}

export const checkProxyUsage = async (id: string) => {
    const response = await axios.get(`/check-proxy-usage/${id}/`);
    return response.data;
}
