import {
    addAction,
    createActionCredentials,
    getActionById,
    getAllActions,
    getAllActionsByStrategy,
    removeAction,
    updateAction
} from "@/services/actions/queries";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";


export const actionsQueryKeys = {
    actionsKeys: ["actions-list"],
    actionsStrategyKey: (strategy: string) => ["actions-strategy", strategy],
    actionKey: (id: string) => ["action", id],
    addActionKey: ["add-action"],
    updateActionKey: (id: string) => ["update-action", id],
    removeActionKey: (id: string) => ["remove-action", id],
}

// -------------QUERIES HOOKS----------------//
export const useActions = () => {
    return useQuery({
        queryKey: actionsQueryKeys.actionsKeys,
        queryFn: () => getAllActions(),
    });
}

export const useAction = (id: string) => {
    return useQuery({
        queryKey: actionsQueryKeys.actionKey(id),
        queryFn: () => getActionById(id),
    });
}

export const useActionsByStrategy = (strategy: string) => {
    return useQuery({
        queryKey: actionsQueryKeys.actionsStrategyKey(strategy),
        queryFn: () => getAllActionsByStrategy(strategy),
    });
}

// -------------MUTATIONS HOOKS----------------//
export const useAddAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: actionsQueryKeys.addActionKey,
        mutationFn: (credentials: createActionCredentials) => addAction(credentials),
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({
                queryKey: actionsQueryKeys.actionsKeys,
            });
            queryClient.invalidateQueries({
                queryKey: actionsQueryKeys.actionsStrategyKey(variables.strategy),
            });
        },
    });
};

export const useUpdateAction = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: createActionCredentials) => updateAction(id, credentials),
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({
                queryKey: actionsQueryKeys.actionsKeys,
            });
            queryClient.invalidateQueries({
                queryKey: actionsQueryKeys.actionsStrategyKey(variables.strategy),
            });
        },
    });
};

export const useRemoveAction = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: actionsQueryKeys.removeActionKey(id),
        mutationFn: (id: string) => removeAction(id),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: actionsQueryKeys.actionsKeys,
            });
        },
    });
};
