import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {connectMultipleAccount, getAllConnectedAccounts} from "@/services/instagram/queries";


export const InstaQueryKeys = {
    connectedAccountsKey: ["connectedAccounts"],
    getConnectedAccountsKey: ["getConnectedAccounts"],
}

export const useInstaAccount = () => {
    return useQuery({
        queryKey: InstaQueryKeys.getConnectedAccountsKey,
        queryFn: () => getAllConnectedAccounts(),
    });
};

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