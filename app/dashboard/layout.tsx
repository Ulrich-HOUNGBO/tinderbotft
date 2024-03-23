import DashboardHeader from "@/components/layouts/dashboard-header";
import SideBar from "@/components/layouts/sidebar";
import AuthProvider from "@/contexts/auth/provider";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<div className="flex">
				<SideBar />
				<div className="container h-screen w-full overflow-y-auto py-5">
					<DashboardHeader />
					<main className="pb-5 font-sans">{children}</main>
				</div>
			</div>
		</AuthProvider>
	);
}
