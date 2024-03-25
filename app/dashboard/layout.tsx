import DashboardHeader from "@/components/layouts/dashboard-header";
import SideBar from "@/components/layouts/sidebar";
import AuthProvider from "@/contexts/auth/provider";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<div className="flex">
				<SideBar />
				<main className="h-screen w-full overflow-y-auto py-5 ">
					<div className="container">
						<DashboardHeader />
						<div className="pb-5 font-sans max-lg:pt-16">{children}</div>
					</div>
				</main>
			</div>
		</AuthProvider>
	);
}
