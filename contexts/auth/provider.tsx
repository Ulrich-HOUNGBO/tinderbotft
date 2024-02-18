"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { AuthContext } from "./context";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/queries/user";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isMounted, setIsMounted] = React.useState(false);
	const { status } = useSession();

	React.useEffect(() => {
		if (window !== undefined) setIsMounted(true);
	}, []);

	const {
		data: userData,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["getMe"],
		queryFn: getMe,
		enabled: isMounted && status === "authenticated",
	});

	if (status === "unauthenticated") {
		return <>{children}</>;
	}
	// console.log("user data =>", data);

	return (
		<AuthContext.Provider value={{ user: userData, refetch }}>
			{isLoading || status === "loading" ? (
				<div className="flex justify-center h-screen flex-col">
					<div className="loader"></div>
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}
