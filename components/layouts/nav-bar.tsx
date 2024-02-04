"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavBarProps {
	items: MainNavItem[];
}

export default function NavBar({ items }: NavBarProps) {
	const pathname = usePathname();

	return (
		<div className="flex items-center justify-between py-3">
			<Link aria-label={siteConfig.name} href="/">
				<h3 className="font-semibold text-xl text-gray-800">{siteConfig.name}</h3>
			</Link>
			<div className="hidden md:flex items-center">
				<NavigationMenu className="lg:flex">
					<NavigationMenuList>
						{items.map((item) => {
							const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

							return (
								<NavigationMenuItem key={item.title}>
									<Link aria-label={item.title} href={item.href} legacyBehavior passHref>
										<NavigationMenuLink
											className={cn(
												navigationMenuTriggerStyle(),
												"h-auto",
												isActive && "font-medium text-primary hover:text-primary"
											)}
										>
											{item.title}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							);
						})}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
			<div className="hidden md:flex items-center space-x-3 md:space-x-4">
				<Button asChild>
					<Link href="/login">Login</Link>
				</Button>
				<Button asChild variant="outline">
					<Link href="/register">Create an account</Link>
				</Button>
			</div>
		</div>
	);
}
