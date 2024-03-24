"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import useAuth from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../logout-button";
import MobileDashboardSidebar from "./mobile-dashboard-sidebar";
import { Skeleton } from "../ui/skeleton";

export default function DashboardHeader() {
	const { user, isLoading } = useAuth();

	return (
		<div className="z-50 mb-8 flex items-center justify-between border-b bg-background pb-3 max-md:container max-md:fixed max-md:inset-x-0 max-md:top-0 max-md:pt-3">
			<div className="flex items-center gap-x-4">
				<div className="lg:hidden">
					<MobileDashboardSidebar />
				</div>
				<h3 className="text-xl font-medium text-gray-700 max-md:hidden">
					{!user || isLoading ? <Skeleton className="h-10 w-48" /> : user && `Welcome ${user?.user.username}`}
				</h3>
			</div>

			<div className="flex items-center gap-x-4">
				{!user || isLoading ? (
					<Skeleton className="h-10 w-24" />
				) : (
					user && (
						<div className="hidden h-10 items-center justify-center rounded-md border px-4 py-2 md:block">
							<span className="text-gray-700">{`${user?.user.credit} ${
								user?.user.credit > 1 ? "Credits" : "Credit"
							}`}</span>
						</div>
					)
				)}
				<Button asChild>
					<Link href={routes.dashboard.credits.index}>Buy Credits</Link>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" className="relative size-11 rounded-full">
							<Avatar className="border">
								<AvatarImage
									src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user?.user.email}`}
									alt={user?.user.username}
								/>
								<AvatarFallback>{user?.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{user?.user.username}</p>
								<p className="text-xs leading-none text-muted-foreground">{user?.user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link href="/dashboard/profile">
									<User className="mr-2 size-4" aria-hidden="true" />
									Profile
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="hover:!bg-destructive/10">
							<LogoutButton />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
