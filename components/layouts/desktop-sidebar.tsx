"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

type DesktopSidebarProps = {
	sidebarNavItems: MainNavItem[];
};

export default function DesktopSidebar({ sidebarNavItems }: DesktopSidebarProps) {
	const pathname = usePathname();

	return (
		<div className="w-80 hidden md:flex flex-col justify-between bg-gray-100 py-7">
			<div className="space-y-12">
				<Link aria-label={siteConfig.name} href="/dashboard/home">
					<h3 className="font-semibold text-xl text-gray-800 px-6">{siteConfig.name}</h3>
				</Link>

				<ul className="flex flex-col gap-y-2">
					{sidebarNavItems.map(({ icon: Icon, ...item }) => {
						const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

						return (
							<Link
								aria-label={item.title}
								href={item.href}
								key={`${item.href}`}
								className={cn(
									"text-gray-800 flex items-center gap-x-2 py-[14px] px-6 rounded-md relative",
									isActive
										? " text-primary font-medium before:content[''] before:w-[6px] before:h-full before:bg-primary before:absolute before:right-0 before:rounded-l-full"
										: "hover:bg-slate-200"
								)}
							>
								<Icon className="w-5 h-5" />
								<span className="text-xs lg:text-base">{item.title}</span>
							</Link>
						);
					})}
				</ul>
			</div>

			<h2 className="px-6">
				<Button className="w-full bg-red-600/80 hover:bg-red-600 h-11">
					<LogOut className="mr-2 h-4 w-4" /> Logout
				</Button>
			</h2>
		</div>
	);
}
