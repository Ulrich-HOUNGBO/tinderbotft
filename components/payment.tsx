"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useKKiaPay } from "kkiapay-react";
import { useQuery } from "@tanstack/react-query";
import { getPlanById } from "@/services/queries/plans";
import CreditCardIcon from "./icons/credit-card";
import useAuth from "@/contexts/auth/hook";

export default function Payment({ planID }: { planID: string }) {
	const { user } = useAuth();
	const { data, isError, isLoading } = useQuery({
		queryKey: ["plan", planID],
		queryFn: () => getPlanById(planID),
	});

	const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } = useKKiaPay();

	function open() {
		if (user && data) {
			openKkiapayWidget({
				amount: data.price,
				api_key: "520ac280d39811edb532ad421d393c9e",
				sandbox: true,
				email: user.user.email,
				phone: "97000000",
			});
		}
	}

	function successHandler(response: any) {
		console.log(response);
	}

	function failureHandler(error: any) {
		console.log(error);
	}

	useEffect(() => {
		addKkiapayListener("success", successHandler);
		addKkiapayListener("failed", failureHandler);

		return () => {
			removeKkiapayListener("success", successHandler);
			removeKkiapayListener("failed", failureHandler);
		};
	}, [addKkiapayListener, removeKkiapayListener]);

	return (
		<div className="text-center">
			<Button onClick={open}>
				<CreditCardIcon className="mr-2" /> Buy Credit
			</Button>
		</div>
	);
}
