import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import SmsListSection from "@/components/sections/sms-list-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Dashboard - Sms",
	description: "Dashboard sms page",
};

export default function SmsPage() {
	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<Breadcrumbs segments={[{ title: "Proxy" }]} />
				<Button asChild className="w-fit font-heading">
					<Link href={routes.dashboard.sms.send}>Ajouter un proxy</Link>
				</Button>
			</div>

			<Suspense>
				<SmsListSection />
			</Suspense>
		</div>
	);
}
