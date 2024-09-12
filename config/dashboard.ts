import { routes } from "@/lib/routes";
import { MainNavItem } from "@/types";
import { CreditCard, LayoutGrid, MessageCircleMore } from "lucide-react";

export const dashboardConfig = {
	mainNav: [
		{
			title: "Dashboard",
			href: routes.dashboard.home,
			icon: LayoutGrid,
		},
		{
			title: "Proxies",
			href: routes.dashboard.sms.index,
			icon: MessageCircleMore,
		},
		{
			title: "Compte Tinder",
			href: routes.dashboard.credits.index,
			icon: CreditCard,
		},
	] satisfies MainNavItem[],
};
