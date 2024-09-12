"use client";

import useAuth from "@/contexts/auth/hook";
import { getPlanById } from "@/services/plans/queries";
import { useQuery } from "@tanstack/react-query";
import { useKKiaPay } from "kkiapay-react";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import CreditCardIcon from "./icons/credit-card";
import { Button } from "./ui/button";

export default function Payment({ planID }: { planID: string }) {
	const { user } = useAuth();
	const [paymenIsPending, setPaymentIsPending] = React.useState(false);
	const { data, isError, isLoading } = useQuery({
		queryKey: ["plan", planID],
		queryFn: () => getPlanById(planID),
	});

	const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener, addKkiapayCloseListener } = useKKiaPay();

	function open() {
		setPaymentIsPending(true);
		if (user && data) {
			// openKkiapayWidget({
			// 	amount: data.price,
			// 	api_key: "520ac280d39811edb532ad421d393c9e",
			// 	sandbox: true,
			// 	email: user.email,
			// 	phone: "97000000",
			// });
		}
	}

	function successHandler(response: any) {
		setPaymentIsPending(false);
		console.log(response);
	}

	function failureHandler(error: any) {
		setPaymentIsPending(false);
		console.log(error);
	}

	useEffect(() => {
		addKkiapayListener("success", successHandler);
		addKkiapayListener("failed", failureHandler);
		addKkiapayCloseListener(() => {
			setPaymentIsPending(false);
		});

		return () => {
			removeKkiapayListener("success");
			removeKkiapayListener("failed");
		};
	}, [addKkiapayListener, removeKkiapayListener, addKkiapayCloseListener]);

	return (
		<div className="text-center">
			<Button onClick={open} disabled={paymenIsPending}>
				{paymenIsPending ? (
					<Loader2 className="mr-2 size-4 animate-spin" />
				) : (
					<CreditCardIcon className="mr-2 dark:text-background" />
				)}
				{/*Acheter du crédit pour {data?.price} FCFA*/}
			</Button>
		</div>
	);
}
