"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { AuthContext } from "./context";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/queries/user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const { status } = useSession();

	const {
		data: userData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["getMe"],
		queryFn: getMe,
		enabled: status === "authenticated",
	});
	console.log("user data =>", userData);

	return <AuthContext.Provider value={{ user: userData, refetch, isLoading }}>{children}</AuthContext.Provider>;
}
