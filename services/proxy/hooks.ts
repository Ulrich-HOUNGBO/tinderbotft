
// -------QUERY & MUTATION KEYS------- //

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addProxy, checkProxyUsage,
    createProxyCredentials,
    getAllProxies,
    getProxyById,
    removeProxy,
    updateProxy
} from "@/services/proxy/queries";

export const proxyQueryKeys = {
    proxiesKey: ["proxies-list"],
    proxyKey: (id: string) => ["proxy", id],
    addProxyKey: ["add-proxy"],
    updateProxyKey: (id: string) => ["update-proxy", id],
    removeProxyKey: (id: string) => ["remove-proxy", id],
    checkProxyUsageKey: (id: string) => ["check-proxy-usage", id],
}

// --------------- QUERIES HOOKS --------------- //
export const useProxies = () => {
    return useQuery({
        queryKey: proxyQueryKeys.proxiesKey,
        queryFn: () => getAllProxies(),
    });
};

export const useProxy = (id: string) => {
    return useQuery({
        queryKey: proxyQueryKeys.proxyKey(id),
        queryFn: () => getProxyById(id),
    });
};

// --------------- MUTATIONS HOOKS --------------- //

export const useAddProxy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: proxyQueryKeys.addProxyKey,
        mutationFn: (credentials: createProxyCredentials) => addProxy(credentials),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: proxyQueryKeys.proxiesKey,
            });
        },
    });
};

export const useUpdateProxy = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: createProxyCredentials) => updateProxy(id, credentials),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: proxyQueryKeys.proxiesKey,
            });
            queryClient.invalidateQueries({
                queryKey: proxyQueryKeys.proxyKey(id),
            });
        },
    });
};

export const useRemoveProxy = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => removeProxy(id),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: proxyQueryKeys.proxiesKey,
            });
        },
    });
};

export const useCheckProxyUsage = (id: string) => {
    return useQuery({
        queryKey: proxyQueryKeys.checkProxyUsageKey(id),
        queryFn: () => checkProxyUsage(id),
    });
}
