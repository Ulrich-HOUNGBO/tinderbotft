import ConfirmEmailSection from "@/components/sections/confirm-email-section";
import { Suspense } from "react";

export default function EmailConfirmationPage() {
	return (
		<Suspense>
			<ConfirmEmailSection />
		</Suspense>
	);
}
