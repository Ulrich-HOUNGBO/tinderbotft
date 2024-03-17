"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButtons from "../auth-buttons";
import { Accordion } from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";

interface MobileNavProps {
	mainNavItems: MainNavItem[];
	session: Session | null;
}

export default function MobileNav({ mainNavItems, session }: MobileNavProps) {
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
					<Accordion type="single" collapsible className="w-full">
						{mainNavItems?.map((item, index) => {
							const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;

							return (
								<div className="py-[14px] text-sm" key={index}>
									<SheetTrigger asChild>
										<Link
											aria-label={item.title}
											href={String(item.href)}
											onClick={() => setIsOpen(false)}
											className={cn(
												"font-medium hover:text-primary-500 ",
												isActive ? "text-primary-500 font-semibold" : "font-medium"
											)}
										>
											{item.title}
										</Link>
									</SheetTrigger>
								</div>
							);
						})}

						<AuthButtons session={session} className="mt-8 flex md:hidden" />
					</Accordion>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
