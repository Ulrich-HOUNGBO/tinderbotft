"use client";

import { SmsInterface } from "@/types";
import { Badge } from "../ui/badge";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";

export default function MessageCard({ sms }: { sms: SmsInterface }) {
	// console.log(formatDistanceToNowStrict(sms.createdAt));

	return (
		<div className="mb-4 cursor-pointer rounded-lg border bg-background p-4 hover:bg-gray-50">
			<div className="mb-1">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-medium">Envoyé à : {sms.to}</h3>
					<span className="text-xs font-medium text-gray-600">
						{formatDistanceToNowStrict(sms.createdAt, {
							addSuffix: true,
							locale: fr,
						})}
					</span>
				</div>
				<span className="text-xs text-gray-600">De : {sms.from}</span>
			</div>
			<div>
				<p>{sms.message}</p>
				<Badge className="font-sans">{sms.status}</Badge>
			</div>
		</div>
	);
}
