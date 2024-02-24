import { Breadcrumbs } from "@/components/breadcrumbs";
import SendSmsForm from "@/components/forms/send-sms-form";
import { routes } from "@/lib/routes";

export default function SendSmsPage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs
				segments={[
					{ title: "Sms", href: routes.dashboard.sms.index },
					{ title: "Send Sms", href: routes.dashboard.sms.send },
				]}
			/>
			<div className="max-w-2xl">
				<SendSmsForm />
			</div>
		</div>
	);
}
