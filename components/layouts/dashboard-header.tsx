"use client";

import { Settings, User } from "lucide-react";
import Link from "next/link";
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
import LogoutButton from "../logout-button";
import { routes } from "@/lib/routes";

export default function DashboardHeader() {
	const { user } = useAuth();

	return (
		<div className="mb-8 flex items-center border-b pb-3 md:justify-between">
			<h3 className="text-xl font-medium text-gray-700 max-md:hidden">Welcome {user?.user.username}</h3>

			<div className="flex items-center gap-x-4">
				<Button asChild>
					<Link href={routes.dashboard.credits.buyCredits}>Buy Credits</Link>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" className="relative size-12 rounded-full">
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
							<DropdownMenuItem asChild>
								<Link href="/dashboard/profile">
									<User className="mr-2 size-4" aria-hidden="true" />
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/dashboard/settings">
									<Settings className="mr-2 size-4" aria-hidden="true" />
									Settings
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
