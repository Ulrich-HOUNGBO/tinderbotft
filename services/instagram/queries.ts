import axios from "@/lib/axios";


export const connectMultipleAccount = async (credentials: any) => {
    const response = await axios.post("/connect-multiple-accounts/", credentials);
    return response.data;
}

export const getAllConnectedAccounts = async () => {
    const response = await axios.get("/get-insta-accounts/");
    return response.data;
}