import { Breadcrumbs } from "@/components/breadcrumbs";
import CreditsListSection from "@/components/sections/credits-list-section";
import PaymentHistory from "@/components/tables/payment-history";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Credits",
	description: "Dashboard credits page",
};

export default function CreditsPage() {
	return (
		<div>
			<div>
				<Breadcrumbs segments={[{ title: "Credits" }]} />
			</div>

			<div className="space-y-6">
				<CreditsListSection />
				<PaymentHistory />
			</div>
		</div>
	);
}
