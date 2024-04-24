import AuthHeader from "@/components/auth-header";
import ResetPasswordForm from "@/components/forms/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Réinitialiser mot de passe",
	description: "Réinitialiser votre mot de passe",
};
export default function ResetPasswordPage() {
	return (
		<div>
			<AuthHeader title="Réinitialiser votre mot de passe" description="Entrez votre nouveau mot de passe" />

			<ResetPasswordForm />
		</div>
	);
}
