"use client";

import { MainNavItem } from "@/types";
import { usePathname } from "next/navigation";
import DashboardSidebarSharedContent from "./dashboard-sidebar-shared-content";

type DesktopSidebarProps = {
	sidebarNavItems: MainNavItem[];
};

export default function DesktopSidebar({ sidebarNavItems }: DesktopSidebarProps) {
	const pathname = usePathname();

	return (
		<div className="hidden h-screen w-56 flex-col justify-between border-r bg-gray-100 px-4 py-7 dark:bg-gray-900/70 lg:flex xl:w-64">
			<DashboardSidebarSharedContent sidebarNavItems={sidebarNavItems} pathname={pathname} />
		</div>
	);
}
