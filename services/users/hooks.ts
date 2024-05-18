import { createAccount, createAccountCredentials, editProfile, getMe, getUserStats } from "@/services/users/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --------------- QUERY & MUTATION KEYS --------------- //
export const usersQueryKeys = {
	usersKey: ["users-list"],
	meKey: ["me"],
	userKey: (id: string) => ["user", id],
	createAccountKey: ["create-account"],
	editProfileKey: (id: string) => ["edit-profile", id],
	deleteUserKey: (id: string) => ["delete-user", id],
	userStatsKey: ["user-stats"],
};

// --------------- QUERIES HOOKS --------------- //
export const useMe = (token: boolean) => {
	return useQuery({
		queryKey: usersQueryKeys.meKey,
		queryFn: getMe,
		enabled: token,
	});
};

export const useStats = () => {
	return useQuery({
		queryKey: usersQueryKeys.userStatsKey,
		queryFn: getUserStats,
	});
};

// --------------- MUTATIONS HOOKS --------------- //
export const useCreateAccount = () => {
	return useMutation({
		mutationKey: usersQueryKeys.createAccountKey,
		mutationFn: (credentials: createAccountCredentials) => createAccount(credentials),
	});
};

export const useEditProfile = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: usersQueryKeys.editProfileKey(userId),
		mutationFn: (credentials: createAccountCredentials) => editProfile(userId, credentials),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: usersQueryKeys.meKey,
			});
		},
	});
};
