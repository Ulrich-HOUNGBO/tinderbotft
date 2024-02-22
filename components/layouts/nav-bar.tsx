"use client";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarButtons from "./navbar-buttons";
import { Session } from "next-auth";
import { routes } from "@/lib/routes";

interface NavBarProps {
	items: MainNavItem[];
	session: Session | null;
}

export default function NavBar({ items, session }: NavBarProps) {
	const pathname = usePathname();

	return (
		<div className="flex items-center justify-between py-7">
			<Link aria-label={siteConfig.name} href="/">
				<h3 className="text-xl font-semibold text-gray-800">{siteConfig.name}</h3>
			</Link>
			<div className="hidden items-center md:flex">
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
			{session ? (
				<Button asChild variant="dashboard">
					<Link href={routes.dashboard.home}>Dashboard</Link>
				</Button>
			) : (
				<div className="hidden items-center space-x-3 md:flex md:space-x-4">
					<Button asChild>
						<Link href={routes.auth.login}>Login</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href={routes.auth.register}>Create an account</Link>
					</Button>
				</div>
			)}
		</div>
	);
}
