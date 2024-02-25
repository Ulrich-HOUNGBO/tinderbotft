import { Breadcrumbs } from "@/components/breadcrumbs";
import SmsListSection from "@/components/sections/sms-list-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SmsPage() {
	return (
		<div>
			<div className="flex flex-col">
				<Breadcrumbs segments={[{ title: "Sms" }]} />
				<Button asChild className="w-fit font-heading">
					<Link href={routes.dashboard.sms.send}>Send Pro SMS</Link>
				</Button>
			</div>

			<Alert className="my-3">
				<AlertCircle className="size-5" />
				<AlertTitle>Unit price of a text message: 500 CFA</AlertTitle>
				<AlertDescription className="pt-2 text-gray-600">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt soluta architecto autem quia quidem, rerum
					magnam aut perspiciatis corporis harum velit repellat adipisci mollitia culpa minus accusantium dicta ipsa
					accusamus.
				</AlertDescription>
			</Alert>
			<SmsListSection />
		</div>
	);
}
