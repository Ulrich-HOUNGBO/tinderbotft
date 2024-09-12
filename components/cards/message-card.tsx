"use client";

import {MessagesList, ProxyInterface} from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "../ui/badge";

export default function MessageCard({ proxy }: { proxy: ProxyInterface }) {
	

	return (
		<div className="mb-4 cursor-pointer rounded-lg border bg-background p-4 hover:bg-gray-50 dark:hover:bg-foreground/5">
			<div className="mb-1">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-medium">Host : {proxy.host}</h3>
					<span className="text-xs text-gray-600 dark:text-foreground/90">
						used
					</span>
				</div>
				<span className="text-xs text-gray-600 dark:text-foreground/90">name : {proxy.name}</span>
			</div>
			<div>
				{/*<p>{proxy.}</p>*/}
				<Badge className="font-sans">{proxy.username}</Badge>
			</div>
		</div>
	);
}
