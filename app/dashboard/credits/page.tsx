import { Breadcrumbs } from "@/components/breadcrumbs";
import CreditsListSection from "@/components/sections/credits-list-section";
import PaymentHistory from "@/components/tables/payment-history";

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
