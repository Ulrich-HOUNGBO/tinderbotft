"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { AuthContext } from "./context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/services/queries/user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();

	const { data: userData, isLoading } = useQuery({
		queryKey: ["getMe"],
		queryFn: getMe,
		enabled: !!session?.accessToken,
	});
	// console.log("user data =>", userData);
	const queryClient = useQueryClient();

	const refetch = () => {
		queryClient.invalidateQueries({ queryKey: ["getMe"] });
	};

	return <AuthContext.Provider value={{ user: userData, refetch, isLoading }}>{children}</AuthContext.Provider>;
}
