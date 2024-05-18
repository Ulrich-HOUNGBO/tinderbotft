import { confirmEmail, forgotPassword, resetPassword } from "@/services/accounts/queries";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- QUERY & MUTATION KEYS --------------- //
export const accountsQueryKeys = {
	confirmEmailKey: ["confirm-email"],
	forgotPasswordKey: ["forgot-password"],
	resetPasswordKey: ["reset-password"],
};

// --------------- QUERIES HOOKS --------------- //
export const useConfirmEmail = (token: string) => {
	return useQuery({
		queryKey: accountsQueryKeys.confirmEmailKey,
		queryFn: async () => {
			return await confirmEmail(token);
		},
		enabled: !!token,
	});
};

// --------------- MUTATIONS HOOKS --------------- //
export const useForgotPassword = () => {
	return useMutation({
		mutationKey: accountsQueryKeys.forgotPasswordKey,
		mutationFn: (email: string) => forgotPassword(email),
	});
};

export const useResetPassword = (token: string) => {
	return useMutation({
		mutationKey: accountsQueryKeys.resetPasswordKey,
		mutationFn: (newPassword: string) => resetPassword(token, newPassword),
	});
};
