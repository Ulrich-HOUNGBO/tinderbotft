import { Breadcrumbs } from "@/components/breadcrumbs";
import { routes } from "@/lib/routes";
import React from "react";

export default function SendSmsPage() {
	return (
		<div>
			<Breadcrumbs
				segments={[
					{ title: "Sms", href: routes.dashboard.sms.index },
					{ title: "Send Sms", href: routes.dashboard.sms.send },
				]}
			/>
		</div>
	);
}
