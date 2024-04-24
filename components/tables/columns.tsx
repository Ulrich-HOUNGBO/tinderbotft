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
							? "bg-green-100 text-green-500"
							: row.original.status === "Échoué"
							? "bg-destructive/10 text-destructive"
							: row.original.status === "En attente"
							? "bg-blue-100 text-blue-600"
							: ""
					}`}
				>
					<div
						className={cn("size-2 rounded-full", {
							"bg-green-500": row.original.status === "Succès",
							"bg-destructive": row.original.status === "Échoué",
							"bg-blue-600": row.original.status === "En attente",
						})}
					></div>
					{row.original.status}
				</div>
			);
		},
	},
];
