import { getSmsByUserId, sendSms, sendSmsCredentials } from "@/services/messages/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --------------- QUERY KEYS --------------- //
export const messagesQueryKeys = {
	messagesKey: ["messages-list"],
	messageKey: (id: string) => ["message", id],
	sendMessageKey: ["send-message"],
	updateMessageKey: (id: string) => ["update-message", id],
	deleteMessageKey: (id: string) => ["delete-message", id],
};

// --------------- QUERIES HOOKS --------------- //
export const useMessages = (userId: string) => {
	return useQuery({
		queryKey: messagesQueryKeys.messagesKey,
		queryFn: () => getSmsByUserId(userId),
	});
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
