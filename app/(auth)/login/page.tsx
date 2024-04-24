import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import LoginForm from "@/components/forms/login-form";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
	title: "Se connecter",
	description: "Connectez-vous à votre compte",
};

export default function LoginPage() {
	return (
		<div>
			<AuthHeader title="Connectez-vous à votre compte" description="Content de vous revoir!" />
			<LoginForm />
			<div className="mt-5 flex items-center justify-center space-x-1 text-xs md:text-sm">
				<p className="text-gray-700">Vous n&apos;avez pas de compte ?</p>
				<Link href={routes.auth.register} className="text-primary underline">
					Créez-en un
				</Link>
			</div>
		</div>
	);
}
