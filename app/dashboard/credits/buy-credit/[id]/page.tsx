import Payment from "@/components/payment";

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
			<h1>Buy credit page for id: {params.id}</h1>
			<Payment planID={params.id} />
		</div>
	);
}
