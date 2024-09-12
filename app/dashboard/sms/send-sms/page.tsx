import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import SendSmsForm from "@/components/forms/send-sms-form";
import { routes } from "@/lib/routes";
import { Metadata } from "next";
import AddProxyForm from "@/components/forms/add-proxy-form";

export const metadata: Metadata = {
	title: "Dashboard - Send Sms",
	description: "Dashboard send sms page",
};

export default function SendSmsPage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs
				segments={[
					{ title: "Proxy", href: routes.dashboard.sms.index },
					{ title: "Ajouter un proxy", href: routes.dashboard.sms.send },
				]}
			/>
			<div className="w-full">
				<AddProxyForm />
			</div>
		</div>
	);
}
