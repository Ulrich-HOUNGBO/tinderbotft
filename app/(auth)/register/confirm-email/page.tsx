import ConfirmEmailSection from "@/components/sections/confirm-email-section";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Confirmer votre adresse mail",
	description: "Confirmation d'email",
};

export default function EmailConfirmationPage() {
	return (
		<Suspense>
			<ConfirmEmailSection />
		</Suspense>
	);
}
