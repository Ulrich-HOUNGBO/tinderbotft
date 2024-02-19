import { Metadata } from "next";

import AuthHeader from "@/components/auth-header";
import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
	title: "Create an account",
	description: "Create an account to access the dashboard.",
};

export default function RegisterPage() {
	return (
		<div>
			<AuthHeader title="Get Started with MarkSafeTo" description="Create your account here" />
			<RegisterForm />
			<div className="flex items-center justify-center mt-5 space-x-2 text-sm">
				<p className="text-gray-700">Already have an account?</p>
				<Link href={routes.auth.login} className="text-primary underline">
					Login here
				</Link>
			</div>
		</div>
	);
}
