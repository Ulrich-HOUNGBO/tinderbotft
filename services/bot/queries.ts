import axios from "@/lib/axios";
import { BotsInterface } from "@/types";

export const getAllBots = async (): Promise<BotsInterface[]> => {
  const response = await axios.get("/get-settings").then((data) => data);
  console.log(response.data);
  return response.data;
};

export const getAllBotByStrategy = async (
  strategy: string,
): Promise<BotsInterface[]> => {
  const response = await axios
    .get(`/get-settings-strategy/${strategy}`)
    .then((data) => data);
  return response.data;
};

export const getBotById = async (id: string): Promise<BotsInterface> => {
  const response = await axios.get(`/get-settings/${id}/`).then((data) => data);
  return response.data;
};

type BotSetting = {
  min_swipe_times: number;
  max_swipe_times: number;
  min_right_swipe_percentage: number;
  max_right_swipe_percentage: number;
  scheduled_time: string; // This should match the format "HH:MM"
  scheduled_time_2: string | undefined; // This should match the format "HH:MM"
  related_day: number; // Day of the week (1-7)
};

export type createBotCredentials = {
  strategy: string; // UUID for the strategy
  bot_settings: BotSetting[]; // Array of bot settings objects
};

export const addBot = async (credentials: createBotCredentials) => {
  const response = await axios.patch("/create-bot-settings/", credentials);
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
