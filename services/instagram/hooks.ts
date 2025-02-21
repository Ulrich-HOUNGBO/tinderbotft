import {useMutation, useQueryClient} from "@tanstack/react-query";
import {connectMultipleAccount, getAllConnectedAccounts} from "@/services/instagram/queries";


export const InstaQueryKeys = {
    connectedAccountsKey: ["connectedAccounts"],
    getConnectedAccountsKey: ["getConnectedAccounts"],
}

export const useGetConnectedAccounts = () => {
    return useMutation({
        mutationFn: () => getAllConnectedAccounts(),
    });
}

export const useConnectMultipleAccount = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials: any) => connectMultipleAccount(credentials),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: InstaQueryKeys.getConnectedAccountsKey,
            });
        },
    });
}