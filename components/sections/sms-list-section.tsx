"use client";

import MessageCard from "@/components/cards/message-card";
import Paginations from "@/components/pagers/paginations";
import RefreshMessages from "@/components/refresh-messages";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { messagesQueryKeys, useMessages, usePrefetchMessages } from "@/services/messages/hooks";
import { getSmsByUserId } from "@/services/messages/queries";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SmsListSection() {
	const { user } = useAuth();
	const [disabled, setDisabled] = useState(false);
	const [pageCount, setPageCount] = useState(1);
	const searchParams = useSearchParams();

	// Search params
	const page = searchParams.get("page") ?? "1";

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);

	const { isLoading, isError, data, isPlaceholderData } = useMessages(user?.id!, pageCount.toString());

	// console.log(data);

	useEffect(() => {
		const queryClient = new QueryClient();

		if (!isPlaceholderData) {
			queryClient.prefetchQuery({
				queryKey: messagesQueryKeys.messagesWithPaginationKey(page),
				queryFn: () => getSmsByUserId(user?.id!, page),
			});
		}
	}, [data, isPlaceholderData, page, user?.id]);

	isError && console.log("Error fetching messages");

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between">
				<div className="flex gap-x-1 font-heading">
					Messages
					{data && (
						<span className="flex size-6 items-center justify-center rounded bg-gray-700 text-background dark:text-foreground/90">
							{data?.data?.length}
						</span>
					)}
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
					{data && data?.data?.length > 0 ? (
						<div>
							{data.data?.map((sms) => (
								<MessageCard key={sms.id} sms={sms} />
							))}
							<Paginations page={page} pageCount={pageCount} createQueryString={createQueryString} />
						</div>
					) : (
						<div className="flex flex-col items-center gap-y-3">
							<h3 className="font-medium text-gray-600 dark:text-foreground/90">Aucun message envoyé</h3>
							<Button asChild className="w-fit font-heading">
								<Link href={routes.dashboard.sms.send}>Envoyer un SMS</Link>
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
