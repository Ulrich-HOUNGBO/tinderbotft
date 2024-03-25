import ConfirmEmailSection from "@/components/sections/confirm-email-section";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Confirm Email",
	description: "Email confirmation page",
};

export default function EmailConfirmationPage() {
	return (
		<Suspense>
			<ConfirmEmailSection />;
		</Suspense>
	);
}
