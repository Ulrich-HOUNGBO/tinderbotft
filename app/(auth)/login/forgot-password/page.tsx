import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
	title: "Mot de passe oublié",
	description: "Envoyer le lien de réinitialisation du mot de passe",
};
export default function ForgotPasswordPage() {
	return (
		<div>
			<AuthHeader
				title="Mot de passe oublié ?"
				description="Entrez votre email et nous vous enverrons un lien de réinitialisation si votre compte existe"
			/>
			<ForgotPasswordForm />
		</div>
	);
}
