"use client";

import DesktopSidebar from "@/components/layouts/desktop-sidebar";
import { dashboardConfig } from "@/config/dashboard";

export default function SideBar() {
	return (
		<div>
			<DesktopSidebar sidebarNavItems={dashboardConfig.mainNav} />
		</div>
	);
}
