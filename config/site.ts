import { MainNavItem } from "@/types";

export const siteConfig = {
	name: "MarkSafeTo",
	description: "Envoyez des SMS professionnels simplement, rapidement et de manière plus fiable",
	url: "https://marksafeto.com",
	mainNav: [
		{
			title: "Acceuil",
			href: "/",
		},
		{
			title: "A propos",
			href: "/#about",
		},
		{
			title: "Fonctionnalités",
			href: "/#features",
		},
		{
			title: "Tarification",
			href: "/#pricing",
		},
	] satisfies MainNavItem[],
};
