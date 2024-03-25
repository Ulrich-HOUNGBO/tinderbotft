import AuthHeader from "@/components/auth-header";
import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Reset your password",
};
export default function ResetPasswordPage() {
	return (
		<div>
			<AuthHeader title="Reset your password" description="Enter your new password" />
			<Suspense>
				<ResetPasswordForm />
			</Suspense>
		</div>
	);
}
