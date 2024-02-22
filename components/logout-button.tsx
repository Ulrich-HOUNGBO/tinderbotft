"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
	return (
		<div
			className="flex w-full cursor-pointer items-center py-[2px] font-medium text-destructive"
			onClick={() =>
				signOut({
					callbackUrl: "/",
				})
			}
		>
			<LogOut className="mr-2 size-4" aria-hidden="true" />
			<span>Log out</span>
		</div>
	);
}
