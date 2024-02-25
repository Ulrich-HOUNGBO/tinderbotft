"use client";

import useAuth from "@/contexts/auth/hook";
import { getSmsByUserId } from "@/services/queries/sms";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SmsListSection() {
	const { user } = useAuth();

	const { isLoading, isSuccess, isError, data } = useQuery({
		queryKey: ["messages", user?.user.id],
		queryFn: () => getSmsByUserId(user?.id!),
	});

	isLoading && console.log("loading");
	isSuccess && console.log(data);
	isError && console.log("error");

	return (
		<div>
			<h1 className="font-heading">Messages list</h1>
		</div>
	);
}
