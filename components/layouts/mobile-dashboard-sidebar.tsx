"use client";

import { dashboardConfig } from "@/config/dashboard";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import DashboardSidebarSharedContent from "./dashboard-sidebar-shared-content";

export default function MobileDashboardSidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					aria-label="Toggle Menu"
					variant="ghost"
					onClick={() => setIsOpen(false)}
					className="border px-2 text-base text-secondary-foreground hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
				>
					<Menu className="size-6" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="px-0 lg:hidden">
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] px-6 pb-10">
					<DashboardSidebarSharedContent
						sidebarNavItems={dashboardConfig.mainNav}
						pathname={pathname}
						setIsOpen={setIsOpen}
					/>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
