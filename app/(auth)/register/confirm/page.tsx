"use client";

import { routes } from "@/lib/routes";
import { confirmEmail } from "@/services/queries/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function EmailConfirmationPage() {
	const token = useSearchParams().get("token");

	const { isSuccess, isError, isLoading, data } = useQuery({
		queryKey: ["confirm-email"],
		queryFn: async () => {
			const response = await confirmEmail(token!);

			return response;
		},
		enabled: !!token,
	});

	isSuccess && console.log("Email confirmed successfully");
	isSuccess && console.log(data);
	isError && console.log("Error confirming email");
	isLoading && console.log("Confirming email");

	console.log(token);
	return (
		<div className="text-center">
			{isSuccess && (
				<>
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
				</>
			)}
		</div>
	);
}
