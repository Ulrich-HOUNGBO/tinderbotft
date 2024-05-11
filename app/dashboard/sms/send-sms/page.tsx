import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import SendSmsForm from "@/components/forms/send-sms-form";
import { routes } from "@/lib/routes";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Send Sms",
	description: "Dashboard send sms page",
};

export default function SendSmsPage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs
				segments={[
					{ title: "Sms", href: routes.dashboard.sms.index },
					{ title: "Envoyer Sms", href: routes.dashboard.sms.send },
				]}
			/>
			<div className="w-full">
				<SendSmsForm />
			</div>
		</div>
	);
}
