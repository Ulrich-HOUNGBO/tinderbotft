"use client";

import { routes } from "@/lib/routes";
import { confirmEmail } from "@/services/queries/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function ConfirmEmailSection() {
	const token = useSearchParams().get("token");

	if (!token) redirect(routes.auth.login);

	const { isSuccess, isError, isLoading } = useQuery({
		queryKey: ["confirm-email"],
		queryFn: async () => {
			return await confirmEmail(token!);
		},
		enabled: !!token,
	});

	if (isLoading) {
		return <p className="text-center">Vérification de votre adresse mail...</p>;
	}

	if (isError) {
		return (
			<div className="space-y-2 text-center">
				<h3 className="text-2xl font-semibold text-red-700 xl:text-3xl">Oops! 🙁</h3>
				<p className="text-sm text-muted-foreground xl:text-lg">
					Une erreur s&apos;est produite lors de la confirmation de votre e-mail. Veuillez réessayer plus tard.
				</p>
			</div>
		);
	}
	return (
		<div className="text-center">
			{isSuccess && (
				<div className="space-y-2">
					<h3 className="text-2xl font-semibold text-green-700 xl:text-3xl">Félicitation! 🎉</h3>
					<p className="text-sm text-muted-foreground xl:text-lg">
						Votre email a été confirmé. Vous pouvez maintenant{" "}
						<Link href={routes.auth.login} className="text-primary underline">
							vous connecter
						</Link>{" "}
						à votre compte.
					</p>
				</div>
			)}
		</div>
	);
}
