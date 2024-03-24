"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { getSmsByUserId } from "@/services/queries/sms";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import MessageCard from "../cards/message-card";
import RefreshMessages from "../refresh-messages";

export default function SmsListSection() {
	const { user } = useAuth();
	const [disabled, setDisabled] = useState(false);

	const { isLoading, isError, data } = useQuery({
		queryKey: ["messages-list"],
		queryFn: () => getSmsByUserId(user?.id!),
	});

	isError && console.log("error");

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<h1 className="font-heading">Messages list</h1>
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
							<h3 className="font-medium text-gray-600">You have no messages</h3>
							<Button asChild className="w-fit font-heading">
								<Link href={routes.dashboard.sms.send}>Send Pro SMS</Link>
							</Button>
						</div>
					)}
					{/* </ScrollArea> */}
				</>
			)}
		</div>
	);
}
