import { Breadcrumbs } from "@/components/breadcrumbs";
import DashboardStats from "@/components/dashboard-stats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Accueil",
	description: "Dashboard Accueil",
};

export default function DashboardHomePage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs segments={[{ title: "Dashboard" }]} />

			<DashboardStats />

			<Alert>
				<Info className="size-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>Vérifiez votre numéro de téléphone et obtenez 10 crédits gratuits</AlertDescription>
			</Alert>
		</div>
	);
}
