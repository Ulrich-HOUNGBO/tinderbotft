"use client";

import { getAllPlans } from "@/services/queries/plans";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import PlansListCard from "../cards/plans-list-card";
import { AlertCircle } from "lucide-react";

export default function CreditsListSection() {
	const { isLoading, isSuccess, isError, data } = useQuery({
		queryKey: ["plans-list"],
		queryFn: () => getAllPlans(),
	});

	isError && console.log("error");

	return (
		<div className="space-y-3">
			<h1 className="font-heading">Credit Packs</h1>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{isLoading && (
					<>
						{Array.from({ length: 3 }).map((_, i) => (
							<Skeleton key={i} className="h-32 rounded-lg" />
						))}
					</>
				)}

				{isSuccess && data.length > 0 ? (
					data.map((plan) => <PlansListCard key={plan.id} props={plan} />)
				) : (
					<div className="col-span-3 flex items-center gap-3 rounded-lg border border-blue-400 p-4">
						<AlertCircle size={24} className="text-blue-400" />
						<h3 className="font-medium text-blue-400">No credit pack available</h3>
					</div>
				)}
			</div>
		</div>
	);
}
