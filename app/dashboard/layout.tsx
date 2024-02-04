"use client";
import DesktopSidebar from "@/components/layouts/desktop-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dashboardConfig } from "@/config/dashboard";
import { Settings, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const username = "john52";
	return (
		<div className="flex flex-row gap-x-5 h-screen">
			<DesktopSidebar sidebarNavItems={dashboardConfig.mainNav} />
			<div className="w-full container py-10">
				<div className="flex items-center justify-between mb-5">
					<h3 className="text-xl font-medium text-gray-700">Welcome JOHN Doe</h3>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" className="relative w-8 h-8 bg-red-400 rounded-full">
								<Avatar className="border">
									<AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">john52</p>
									<p className="text-xs leading-none text-muted-foreground">johndoe50@gmail.com</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/profile">
										<User className="w-4 h-4 mr-2" aria-hidden="true" />
										Profile
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/settings">
										<Settings className="w-4 h-4 mr-2" aria-hidden="true" />
										Settings
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
