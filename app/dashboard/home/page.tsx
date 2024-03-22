import { Breadcrumbs } from "@/components/breadcrumbs";
import StatsCard, { StatsCardProps } from "@/components/cards/stats-card";
import { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const metadata: Metadata = {
	title: "Dashboard - Home",
	description: "Dashboard home page",
};

const stats = [
	{ type: "credit", value: 0 },
	{ type: "sms", value: 0 },
] satisfies StatsCardProps[];

export default function DashboardHomePage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs segments={[{ title: "Dashboard" }]} />

			<div className="mt-5 grid gap-6 md:grid-cols-2">
				{stats.map((stat) => (
					<StatsCard key={stat.type} props={stat} />
				))}
			</div>

			<Alert className="bg-slate-100">
				<Info className="size-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>Verify your phone number and get 10 free credits</AlertDescription>
			</Alert>
		</div>
	);
}
