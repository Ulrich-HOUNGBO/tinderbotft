import DashboardHeader from "@/components/layouts/dashboard-header";
import SideBar from "@/components/layouts/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-row gap-x-5">
			<SideBar />
			<div className="container w-full py-10">
				<DashboardHeader />
				{children}
			</div>
		</div>
	);
}
