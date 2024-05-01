"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import Link from "next/link";
import { useState } from "react";
import MessageCard from "../cards/message-card";
import RefreshMessages from "../refresh-messages";
import { useMessages } from "@/services/messages/hooks";

export default function SmsListSection() {
	const { user } = useAuth();
	const [disabled, setDisabled] = useState(false);

	const { isLoading, isError, data } = useMessages(user?.id!);

	isError && console.log("Error fetching messages");

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<div className="flex gap-x-1 font-heading">
					Messages
					<span className="flex size-6 items-center justify-center rounded bg-gray-700 text-background dark:text-foreground/90">
						{data?.length}
					</span>
				</div>
				<RefreshMessages isLoading={isLoading} disabled={disabled} setDisabled={setDisabled} />
			</div>
			{isLoading ? (
				<div className="flex flex-col gap-4 p-4">
					{Array.from({ length: 2 }).map((_, i) => (
						<Skeleton key={i} className="h-36 rounded-lg" />
					))}
				</div>
			) : (
				<>
					{/* <ScrollArea className="h-56 rounded-lg border border-gray-100 p-4 xl:h-96 2xl:h-[30rem]"> */}
					{data && data.length > 0 ? (
						data?.map((sms) => <MessageCard key={sms.id} sms={sms} />)
					) : (
						<div className="flex flex-col items-center gap-y-3">
							<h3 className="font-medium text-gray-600 dark:text-foreground/90">Aucun message envoyé</h3>
							<Button asChild className="w-fit font-heading">
								<Link href={routes.dashboard.sms.send}>Envoyer un SMS</Link>
							</Button>
						</div>
					)}
					{/* </ScrollArea> */}
				</>
			)}
		</div>
	);
}
