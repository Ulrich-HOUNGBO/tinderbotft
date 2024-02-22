import DashboardHeader from "@/components/layouts/dashboard-header";
import DesktopSidebar from "@/components/layouts/desktop-sidebar";
import { dashboardConfig } from "@/config/dashboard";
import AuthProvider from "@/contexts/auth/provider";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<div className="flex h-screen flex-row gap-x-5">
				{/* <DesktopSidebar sidebarNavItems={dashboardConfig.mainNav} /> */}
				<div className="container w-full py-10">
					<DashboardHeader />
					{children}
				</div>
			</div>
		</AuthProvider>
	);
}
