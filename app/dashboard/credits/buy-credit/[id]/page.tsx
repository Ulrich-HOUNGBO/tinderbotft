import { Breadcrumbs } from "@/components/breadcrumbs";
import Payment from "@/components/payment";
import { routes } from "@/lib/routes";

interface BuyCreditPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata() {
	return {
		title: "Dashboard - Buy Credit",
		description: "Buy credit to send SMS",
	};
}

export default function BuyCreditPage({ params }: BuyCreditPageProps) {
	return (
		<div>
			<Breadcrumbs
				segments={[
					{ title: "Credits", href: routes.dashboard.credits.index },
					{ title: "Buy Credits", href: routes.dashboard.credits.buyCredits(params.id) },
				]}
			/>
			<h1 className="my-6">Buy credit page</h1>
			<Payment planID={params.id} />
		</div>
	);
}
