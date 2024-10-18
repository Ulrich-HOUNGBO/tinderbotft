import axios from "@/lib/axios";
import {AllModelsInterface, ModelInterface} from "@/types";


export const getAllModels = async (): Promise<AllModelsInterface[]> => {
    const response = await axios.get("/get-all-modele/").then((data) => data);
    console.log(response.data)
    return response.data;
}

export const getModelById = async (id: string): Promise<ModelInterface> => {
    const response = await axios.get(`/get-modele/${id}`).then((data) => data);
    return response.data;
}

export interface createModelCredentials {
    name: string;
    description: string;
}

export const addModel = async (credentials: createModelCredentials) => {
    const response = await axios.post("/create-modele/", credentials);
    return response.data;
}

export const updateModel = async (
    id: string,
    credentials: Partial<createModelCredentials>,
) => {
    const response = await axios.patch(`/update-modele/${id}`, credentials);
    return response.data;
}

export const removeModel = async (id: string) => {
    const response = await axios.delete(`/delete-modele/${id}`);
    return response.data;
}
