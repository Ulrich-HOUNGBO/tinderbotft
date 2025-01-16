import axios from "@/lib/axios";
import {BotAccountInterface} from "@/types";

export const getAllAccounts = async (): Promise<BotAccountInterface[]> => {
  const response = await axios.get("/get-accounts/").then((data) => data);
  return response.data;
};

export const getAccountById = async (
  id: string,
): Promise<BotAccountInterface> => {
  const response = await axios.get(`/get-account/${id}`).then((data) => data);
  return response.data;
};

export interface createBotAccountCredentials {
  title: string;
  model: string;
  strategy: string | null;
  token: string;
  refresh_token: string | null;
  progress: number | undefined;
  device_id: string | undefined;
  timezone_field: string;
}

export const addAccount = async (credentials: createBotAccountCredentials) => {
  const response = await axios.post("/create-account/", credentials);
  return response.data;
};

export const updateAccount = async (
  id: string,
  credentials: Partial<createBotAccountCredentials>,
) => {
  const response = await axios.patch(`/update-account/${id}`, credentials);
  return response.data;
};

export const removeAccount = async (id: string) => {
  const response = await axios.delete(`/delete-account/${id}`);
  return response.data;
};

export const startAccount = async (id: string) => {
  const response = await axios.patch(`/start-process/${id}`);
  return response.data;
};
