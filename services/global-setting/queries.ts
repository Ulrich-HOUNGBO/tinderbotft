import axios from "@/lib/axios";
import {GlobalSettingInterface} from "@/types";


export const getAllGlobalSettings = async (): Promise<GlobalSettingInterface[]> => {
    const response = await axios.get("/get-global-settings/").then((data) => data);
    return response.data;
}

export interface createGlobalSettingCredentials {
   swipe_times: number;
   right_swipe_percentage: number;
}

export const addGlobalSetting = async (credentials: createGlobalSettingCredentials) => {
    const response = await axios.post("/create-global-settings/", credentials);
    return response.data;
}

export const updateGlobalSetting = async (id: string, credentials: createGlobalSettingCredentials) => {
    const response = await axios.put(`/update-global-settings/${id}/`, credentials);
    return response.data;
}

export const removeGlobalSetting = async (id: string) => {
    const response = await axios.delete(`/delete-global-settings/${id}/`);
    return response.data;
}
