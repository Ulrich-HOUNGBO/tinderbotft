"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";

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

			<SheetContent side="mobileLeft" className="px-0 lg:hidden">
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="space-y-12">
						<Link aria-label={siteConfig.name} href={routes.dashboard.home}>
							<h3 className="px-6 text-xl font-semibold text-gray-800">{siteConfig.name}</h3>
						</Link>

						<ul className="flex flex-col gap-y-2">
							{dashboardConfig.mainNav.map(({ icon: Icon, ...item }) => {
								const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

								return (
									<Link
										aria-label={item.title}
										href={item.href}
										key={`${item.href}`}
										onClick={() => setIsOpen(false)}
										className={cn(
											"text-gray-800 flex items-center gap-x-2 py-[14px] px-6 rounded-md relative",
											isActive
												? " text-primary font-medium before:content[''] before:w-[6px] before:h-full before:bg-primary before:absolute before:right-0 before:rounded-l-full"
												: "hover:bg-slate-200"
										)}
									>
										<Icon className="size-5" />
										<span className="text-xs lg:text-base">{item.title}</span>
									</Link>
								);
							})}
						</ul>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
