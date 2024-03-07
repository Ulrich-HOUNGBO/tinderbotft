"use client";

import useAuth from "@/contexts/auth/hook";
import { getSmsByUserId } from "@/services/queries/sms";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SmsInterface } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SmsListSection() {
	const { user } = useAuth();

	const { isLoading, isSuccess, isError, data } = useQuery<SmsInterface[]>({
		queryKey: ["messages-list"],
		queryFn: () => getSmsByUserId(user?.id!),
	});

	// isError && console.log("error");

	if (isLoading) {
		return (
			<div className="space-y-5">
				<h1 className="font-heading">Messages list</h1>
				<div className="flex flex-col gap-4 p-4">
					{Array.from({ length: 2 }).map((_, i) => (
						<Skeleton key={i} className="h-36 rounded-lg" />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-5">
			<h1 className="font-heading">Messages list</h1>
			<ScrollArea className="h-56 rounded-lg border border-gray-100 p-4 xl:h-96 2xl:h-[30rem]">
				{isSuccess && data.length > 0 ? (
					data?.map((sms) => (
						<div key={sms.id} className="mb-4 cursor-pointer rounded-lg border bg-background p-4 hover:bg-gray-50">
							<div className="mb-1">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-medium">Sent to : {sms.to}</h3>
									<span className="text-xs font-medium text-gray-600">{sms.createdAt}</span>
								</div>
								<span className="text-xs text-gray-600">From : {sms.from}</span>
							</div>
							<div>
								<p>{sms.message}</p>
								<Badge className="font-sans">{sms.status}</Badge>
							</div>
						</div>
					))
				) : (
					<div className="flex flex-col items-center gap-y-3">
						<h3 className="font-medium text-gray-600">You have no messages</h3>
						<Button asChild className="w-fit font-heading">
							<Link href={routes.dashboard.sms.send}>Send Pro SMS</Link>
						</Button>
					</div>
				)}
			</ScrollArea>
		</div>
	);
}
