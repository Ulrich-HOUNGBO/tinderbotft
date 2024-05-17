"use client";

import StatsCard, { StatsCardProps } from "@/components/cards/stats-card";
import { useStats } from "@/services/users/hooks";

const stats = [
	{ label: "Crédit(s) disponible", type: "credit", value: 0 },
	{ label: "Sms envoyés", type: "sms", value: 0 },
] satisfies StatsCardProps[];

export default function DashboardStats() {
	const { data, isSuccess } = useStats();

	isSuccess && console.log(data);

	return (
		<>
			<div className="mt-5 grid gap-6 md:grid-cols-2">
				{stats.map((stat) => (
					<StatsCard key={stat.type} props={stat} />
				))}
			</div>
		</>
	);
}
