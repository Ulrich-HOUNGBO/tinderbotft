"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useKKiaPay } from "kkiapay-react";

export default function Payment() {
	const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } = useKKiaPay();

	function open() {
		openKkiapayWidget({
			amount: 5000,
			api_key: "520ac280d39811edb532ad421d393c9e",
			sandbox: true,
			email: "warisaremou2003@gmail.com",
			phone: "97000000",
		});
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
			<Button onClick={open}>Pay now</Button>
		</div>
	);
}
