import { getSmsByUserId, sendSms, sendSmsCredentials } from "@/services/messages/queries";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --------------- QUERY KEYS --------------- //
export const messagesQueryKeys = {
	messagesKey: ["messages-list"],
	messagesWithPaginationKey: (page: string) => ["messages-list", page],
	messageKey: (id: string) => ["message", id],
	sendMessageKey: ["send-message"],
	updateMessageKey: (id: string) => ["update-message", id],
	deleteMessageKey: (id: string) => ["delete-message", id],
};

// --------------- QUERIES HOOKS --------------- //
export const useMessages = (userId: string, page: string) => {
	return useQuery({
		queryKey: messagesQueryKeys.messagesWithPaginationKey(page),
		queryFn: () => getSmsByUserId(userId, page),
		placeholderData: keepPreviousData,
	});
};

export const usePrefetchMessages = (userId: string, page: string) => {
	const queryClient = useQueryClient();

	return () => {
		queryClient.prefetchQuery({
			queryKey: messagesQueryKeys.messagesWithPaginationKey(page),
			queryFn: () => getSmsByUserId(userId, page),
		});
	};
};

// --------------- MUTATIONS HOOKS --------------- //
export const useSendMessage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: messagesQueryKeys.sendMessageKey,
		mutationFn: (credentials: sendSmsCredentials) => sendSms(credentials),
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: messagesQueryKeys.messagesKey,
			});
			queryClient.invalidateQueries({
				queryKey: ["getMe"],
			});
		},
	});
};
