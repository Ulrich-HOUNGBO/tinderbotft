import axios from '@/lib/axios';
import {ActionsInterface} from "@/types";

export const getAllActions = async (): Promise<ActionsInterface[]> => {
    const response = await axios.get(`/get-actions/`).then((data) => data);
    return response.data;
}

export const getAllActionsByStrategy = async(strategy: string): Promise<ActionsInterface[]> => {
    const response = await axios.get(`/get-strategy-actions/${strategy}/`).then((data) => data);
    return response.data;
}

export const getActionById = async(id: string): Promise<ActionsInterface> => {
    const response = await axios.get(`/get-actions/${id}`).then((data) => data);
    return response.data;
}

type Action = {
    type: string;
    insta_list: string | undefined;
    bio_list: string | undefined;
    min_swipe_times: number | undefined;
    max_swipe_times: number | undefined;
    min_right_swipe_percentage: number | undefined;
    max_right_swipe_percentage: number | undefined;
    scheduled_time: string; // This should match the format "HH:MM"
    scheduled_time_2: string | undefined; // This should match the format "HH:MM"
    related_day: number;
}

export interface createActionCredentials{
    strategy: string;
    actions: Action[];
}

export const addAction = async(credentials: createActionCredentials) => {
    const response = await axios.patch(`/create-action/`, credentials);
}

export const updateAction = async(id: string, credentials: createActionCredentials) => {
    const response = await axios.put(`/update-action/${id}/`, credentials);
    return response.data;
}

export const removeAction = async(id: string) => {
    const response = await axios.delete(`/delete-actions/${id}/`);
    return response.data;
}
