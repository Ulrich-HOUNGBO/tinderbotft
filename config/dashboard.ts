import { MainNavItem } from "@/types";
import { CreditCard, LayoutGrid, MessageCircleMore } from "lucide-react";

export const dashboardConfig = {
	mainNav: [
		{
			title: "Dashboard",
			href: "/dashboard/home",
			icon: LayoutGrid,
		},
		{
			title: "Sms",
			href: "/dashboard/sms",
			icon: MessageCircleMore,
		},
		{
			title: "Credits",
			href: "/dashboard/credits",
			icon: CreditCard,
		},
	] satisfies MainNavItem[],
};
