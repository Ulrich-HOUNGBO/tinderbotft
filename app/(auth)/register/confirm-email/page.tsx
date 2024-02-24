"use client";

import { routes } from "@/lib/routes";
import { confirmEmail } from "@/services/queries/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function EmailConfirmationPage() {
	const token = useSearchParams().get("token");

	if (!token) redirect(routes.auth.login);

	const { isSuccess, isError, isLoading } = useQuery({
		queryKey: ["confirm-email"],
		queryFn: async () => {
			const response = await confirmEmail(token!);
			return response;
		},
		enabled: !!token,
	});

	if (isLoading) {
		return <p className="text-center">We&apos;re verifying your email</p>;
	}

	if (isError) {
		<div className="space-y-2 text-center">
			<h3 className="text-2xl font-semibold text-red-700 xl:text-3xl">Oops! 🙁</h3>
			<p className="text-sm text-muted-foreground xl:text-lg">
				There was an error confirming your email. Please try again later.
			</p>
		</div>;
	}
	return (
		<div className="text-center">
			{isSuccess && (
				<div className="space-y-2">
					<h3 className="text-2xl font-semibold text-green-700 xl:text-3xl">Congratulation! 🎉</h3>
					<p className="text-sm text-muted-foreground xl:text-lg">
						Your email has been confirmed. You can now{" "}
						<Link href={routes.auth.login} className="text-primary underline">
							login
						</Link>{" "}
						to your account.
					</p>
				</div>
			)}
		</div>
	);
}
