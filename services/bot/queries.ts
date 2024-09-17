import axios from "@/lib/axios";
import { BotsInterface } from "@/types";
import { TimeValue } from "react-aria";

export const getAllBots = async (): Promise<BotsInterface[]> => {
  const response = await axios.get("/get-settings/").then((data) => data);
  console.log(response.data);
  return response.data;
};

export const getBotById = async (id: string): Promise<BotsInterface> => {
  const response = await axios.get(`/get-settings/${id}/`).then((data) => data);
  return response.data;
};

export interface createBotCredentials {
  bot_name: string;
  token: string;
  refresh_token: string | null;
  proxy: string | null;
  swipe_times: number | null;
  right_swipe_percentage: number | null;
  device_id: string | null;
  schedule_time: TimeValue | undefined;
}

export const addBot = async (credentials: createBotCredentials) => {
  const response = await axios.post("/create-bot-settings/", credentials);
  return response.data;
};

export const updateBot = async (
  id: string,
  credentials: createBotCredentials,
) => {
  const response = await axios.put(`/update-bot-settings/${id}/`, credentials);
  return response.data;
};

export const removeBot = async (id: string) => {
  const response = await axios.delete(`/delete-bot-settings/${id}/`);
  return response.data;
};

export const startBot = async (id: string) => {
  const response = await axios.patch(`/start-bot/${id}`);
  return response.data;
};

export const stopBot = async (id: string) => {
  const response = await axios.patch(`/stop-bot/${id}`);
  return response.data;
};
