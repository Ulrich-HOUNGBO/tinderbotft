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
		<div>
			<div className="flex items-center justify-between">
				<Breadcrumbs segments={[{ title: "Sms" }]} />
				<Button asChild className="w-fit font-heading">
					<Link href={routes.dashboard.sms.send}>Envoyer un SMS</Link>
				</Button>
			</div>

			<Alert className="my-5">
				<AlertCircle className="size-5" />
				<AlertTitle>Prix unitaire d&apos;un SMS : 10 crédits</AlertTitle>
				<AlertDescription className="pt-2 text-gray-600 dark:text-foreground/90">
					<p className="text-sm">
						- Avez-vous acheter un pack SMS sans voir votre crédit SMS ajouté à votre solde automatiquement ?
					</p>
					<p className="text-sm">- Vos destinataires ne confirment pas la réception de vos SMS Pro ?</p>
				</AlertDescription>
			</Alert>
			{/* <Suspense> */}
			<SmsListSection />
			{/* </Suspense> */}
		</div>
	);
}
