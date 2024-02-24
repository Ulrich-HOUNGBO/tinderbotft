import { Breadcrumbs } from "@/components/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard Home",
	description: "Dashboard home page",
};

export default function DashboardHomePage() {
	return (
		<div>
			<Breadcrumbs segments={[{ title: "Dashboard" }]} />
		</div>
	);
}
