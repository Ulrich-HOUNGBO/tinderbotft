import { Breadcrumbs } from "@/components/breadcrumbs";
import SmsListSection from "@/components/sections/sms-list-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Sms",
	description: "Dashboard sms page",
};

export default function SmsPage() {
	return (
		<div>
			<div className="flex items-center justify-between">
				<Breadcrumbs segments={[{ title: "Sms" }]} />
				<Button asChild className="w-fit font-heading">
					<Link href={routes.dashboard.sms.send}>Send Pro SMS</Link>
				</Button>
			</div>

			<Alert className="my-5">
				<AlertCircle className="size-5" />
				<AlertTitle>Unit price of a text message: 10 credits</AlertTitle>
				<AlertDescription className="pt-2 text-gray-600">
					<p className="text-xs">
						Have you purchased an SMS pack without seeing your SMS credit added to your balance automatically?
					</p>
					<p className="text-xs">Your recipients do not confirm receipt of your Pro SMS?</p>
				</AlertDescription>
			</Alert>
			<SmsListSection />
		</div>
	);
}
