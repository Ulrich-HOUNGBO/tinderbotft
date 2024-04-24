"use client";

import { cn } from "@/lib/utils";
import { PaymentHistoryInterface } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const paymentHistoryColumns: ColumnDef<PaymentHistoryInterface>[] = [
	{
		accessorKey: "pack",
		header: "Pack",
	},
	{
		accessorKey: "status",
		header: "Statut",
		cell: ({ row }) => {
			return (
				<div
					className={`flex w-fit items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
						row.original.status === "Succès"
							? "bg-green-100 dark:bg-green-500/20 text-green-500"
							: row.original.status === "Échoué"
							? "bg-destructive/10 dark:bg-red-500/20 text-destructive dark:text-red-500/80"
							: row.original.status === "En attente"
							? "bg-blue-100 bg-blue-500/20 text-blue-500"
							: ""
					}`}
				>
					<div
						className={cn("size-2 rounded-full", {
							"bg-green-500": row.original.status === "Succès",
							"bg-destructive dark:bg-red-500/80": row.original.status === "Échoué",
							"bg-blue-600": row.original.status === "En attente",
						})}
					></div>
					{row.original.status}
				</div>
			);
		},
	},
];
