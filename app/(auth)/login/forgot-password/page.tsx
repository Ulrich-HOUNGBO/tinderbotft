import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
	title: "Forgot Password",
	description: "Send reset password link",
};
export default function ForgotPasswordPage() {
	return (
		<div>
			<AuthHeader title="Forgot your password ?" description="Enter your email and we'll send you a reset link if your account exists" />
			<ForgotPasswordForm />
		</div>
	);
}
