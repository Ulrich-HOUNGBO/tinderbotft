import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
	title: "Créer un compte",
	description: "Créez un compte pour accéder au tableau de bord.",
};

export default function RegisterPage() {
	return (
		<div>
			<AuthHeader title="Commencez avec MarkSafeTo" description="Créez votre compte" />
			<RegisterForm />
			<div className="mt-5 flex items-center justify-center space-x-1 text-xs md:text-sm">
				<p className="text-gray-700">Vous avez déjà un compte ?</p>
				<Link href={routes.auth.login} className="text-primary underline">
					Se connecter
				</Link>
			</div>
		</div>
	);
}
