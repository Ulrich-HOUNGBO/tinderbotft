import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import ResetPasswordForm from "@/components/forms/reset-password-form";

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Reset your password",
};
export default function ResetPasswordPage() {

	return (
		<div>
			<AuthHeader title="Reset your password" description="Enter your new password" />
			<ResetPasswordForm />
		</div>
	);
}
