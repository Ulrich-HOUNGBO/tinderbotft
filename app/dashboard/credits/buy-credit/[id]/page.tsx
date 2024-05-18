import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import Payment from "@/components/payment";
import { routes } from "@/lib/routes";
import { getPlanById } from "@/services/plans/queries";

interface BuyCreditPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({ params }: BuyCreditPageProps) {
	try {
		const planData = await getPlanById(params.id);
		// console.log(planData);
		return {
			title: `Dashboard - Buy ${planData.credit} Credits`,
			description: `Buy ${planData.credit} credits for ${planData.price}`,
		};
	} catch (error) {
		return {
			title: "Dashboard - Buy Credits",
			description: "Buy credits page",
		};
	}
}

export default function BuyCreditPage({ params }: BuyCreditPageProps) {
	return (
		<div>
			<Breadcrumbs
				segments={[
					{ title: "Credits", href: routes.dashboard.credits.index },
					{ title: "Acheter du credits", href: routes.dashboard.credits.buyCredits(params.id) },
				]}
			/>
			{/* <h1 className="my-6">Buy credit page</h1> */}
			<Payment planID={params.id} />
		</div>
	);
}
