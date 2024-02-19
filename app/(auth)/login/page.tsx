import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import LoginForm from "@/components/forms/login-form";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

export default function LoginPage() {
	return (
		<div>
			<AuthHeader title="Log in to your account" description="Welcome back!" />
			<LoginForm />
			<div className="flex items-center justify-center mt-5 space-x-2 text-sm">
				<p className="text-gray-700">D&apos;ont have an account?</p>
				<Link href={routes.auth.register} className="text-primary underline">
					Create an account
				</Link>
			</div>
		</div>
	);
}
