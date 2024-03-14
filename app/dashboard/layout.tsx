import DashboardHeader from "@/components/layouts/dashboard-header";
import SideBar from "@/components/layouts/sidebar";
import AuthProvider from "@/contexts/auth/provider";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<div className="flex h-screen">
				<SideBar />
				<div className="container w-full py-5">
					<DashboardHeader />
					<main className="pb-10 font-sans">{children}</main>
				</div>
			</div>
		</AuthProvider>
	);
}
