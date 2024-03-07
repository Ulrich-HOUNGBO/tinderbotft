"use client";

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
				<span
					className={`rounded-full px-2 py-1 text-xs font-medium text-white ${
						row.original.status === "success"
							? "bg-green-500"
							: row.original.status === "failed"
							? "bg-destructive"
							: row.original.status === "pending"
							? "bg-blue-500"
							: ""
					}`}
				>
					{row.original.status}
				</span>
			);
		},
	},
];
