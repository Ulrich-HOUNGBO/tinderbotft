"use client";


import { AlertCircle } from "lucide-react";
import PlansListCard from "../cards/plans-list-card";
import { Skeleton } from "../ui/skeleton";
import {useBots} from "@/services/bot/hooks";
import {BotsInterface} from "@/types";

export default function CreditsListSection() {
	const { isLoading, isError, data } = useBots();

	isError && console.log("error");

	return (
		<div className="space-y-3">
			<h1 className="font-heading dark:text-foreground/90">
				Liste des bots disponibles
			</h1>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{isLoading ? (
					<>
						{Array.from({ length: 3 }).map((_, i) => (
							<Skeleton key={i} className="h-[102px] rounded-lg" />
						))}
					</>
				) : data ? (
					data.length > 0 && data.map((bot) => <PlansListCard key={bot.id} props={bot as BotsInterface} />)
				) : (
					<div className="col-span-3 flex items-center gap-3 rounded-lg border border-blue-400 p-4">
						<AlertCircle size={24} className="text-blue-400" />
						<h3 className="font-medium text-blue-400">Aucun compte disponible</h3>
					</div>
				)}
			</div>
		</div>
	);
}
