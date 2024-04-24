"use client";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "../auth-buttons";
import Logo from "../logo";

interface NavBarProps {
	items: MainNavItem[];
	session: Session | null;
}

export default function NavBar({ items, session }: NavBarProps) {
	const pathname = usePathname();

	return (
		<div className="flex w-full items-center justify-between gap-x-6 md:gap-0">
			<Logo />
			<div className="flex w-full items-center justify-end space-x-6 lg:w-auto lg:justify-normal">
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						{items.map((item) => {
							const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

							return (
								<NavigationMenuItem key={item.title}>
									<Link aria-label={item.title} href={item.href} legacyBehavior passHref>
										<NavigationMenuLink
											className={cn(
												navigationMenuTriggerStyle(),
												"h-auto font-medium text-gray-500",
												isActive && "text-primary hover:text-primary"
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

			<AuthButtons session={session} className="mr-3 hidden md:flex lg:mr-0" />
		</div>
	);
}
