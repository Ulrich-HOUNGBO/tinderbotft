import { createAccount, createAccountCredentials, editProfile, getMe } from "@/services/users/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// --------------- QUERY KEYS --------------- //
export const usersQueryKeys = {
	usersKey: ["users-list"],
	meKey: ["me"],
	userKey: (id: string) => ["user", id],
	createAccountKey: ["create-account"],
	editProfileKey: (id: string) => ["edit-profile", id],
	deleteUserKey: (id: string) => ["delete-user", id],
};

// --------------- QUERIES HOOKS --------------- //
export const useMe = (token: boolean) => {
	return useQuery({
		queryKey: usersQueryKeys.meKey,
		queryFn: getMe,
		enabled: token,
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
		mutationFn: (id: string) => editProfile(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: usersQueryKeys.meKey,
			});
		},
	});
};
