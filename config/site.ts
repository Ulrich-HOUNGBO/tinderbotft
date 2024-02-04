import { MainNavItem } from "@/types";

export const siteConfig = {
	name: "MarkSafeTo",
	description: "Envoyer des SMS professionnels simplement, rapidement et avec plus de fiabilité",
	mainNav: [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "About",
			href: "/#about",
		},
		{
			title: "Our Pricing",
			href: "/#pricing",
		},
	] satisfies MainNavItem[],
};
