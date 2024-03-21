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
		header: "Status",
		cell: ({ row }) => {
			return (
				<div
					className={`flex w-fit items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
						row.original.status === "success"
							? "bg-green-100 text-green-500"
							: row.original.status === "failed"
							? "bg-destructive/10 text-destructive"
							: row.original.status === "pending"
							? "bg-blue-100 text-blue-600"
							: ""
					}`}
				>
					<div
						className={cn("size-2 rounded-full", {
							"bg-green-500": row.original.status === "success",
							"bg-destructive": row.original.status === "failed",
							"bg-blue-600": row.original.status === "pending",
						})}
					></div>
					{row.original.status}
				</div>
			);
		},
	},
];
