import React from "react";
import { DataTable } from "../ui/data-table";
import { paymentHistoryColumns } from "./columns";
import { PaymentHistoryInterface } from "@/types";

export default function PaymentHistory() {
	const data = [
		{
			id: "1",
			pack: "5000 FCFA",
			status: "Succès",
		},
		{
			id: "2",
			pack: "5000 FCFA",
			status: "Échoué",
		},
		{
			id: "3",
			pack: "5000 FCFA",
			status: "En attente",
		},
	] satisfies PaymentHistoryInterface[];

	return (
		<div className="space-y-3">
			<h1 className="font-heading">Historique de paiement</h1>
			<DataTable columns={paymentHistoryColumns} data={data} />
		</div>
	);
}
