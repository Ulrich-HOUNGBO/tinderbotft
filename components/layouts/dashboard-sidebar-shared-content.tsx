"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";

type DashboardSidebarSharedContentProps = {
	sidebarNavItems: MainNavItem[];
	pathname: string;
	setIsOpen?: (value: boolean) => void;
};

export default function DashboardSidebarSharedContent({
	sidebarNavItems,
	pathname,
	setIsOpen,
}: DashboardSidebarSharedContentProps) {
	return (
		<div className="space-y-12">
			<Logo />

			<ul className="flex flex-col gap-y-2">
				{sidebarNavItems.map(({ icon: Icon, ...item }) => {
					const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

					return (
						<Link
							aria-label={item.title}
							href={item.href}
							key={`${item.href}`}
							onClick={() => setIsOpen?.(false)}
							className={cn(
								"text-gray-800 flex items-center gap-x-2 py-[14px] px-4 rounded-md relative",
								isActive ? "font-medium bg-primary text-white" : "hover:bg-slate-200"
							)}
						>
							<Icon className="size-5" />
							<span className="text-xs lg:text-base">{item.title}</span>
						</Link>
					);
				})}
			</ul>
		</div>
	);
}
