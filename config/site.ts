import { MainNavItem } from "@/types";

export const siteConfig = {
	name: "MarkSafeTo",
	description: "Send professional SMS messages simply, quickly and more reliably",
	url: "https://marksafeto.com",
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
			title: "Features",
			href: "/#features",
		},
		{
			title: "Our Pricing",
			href: "/#pricing",
		},
	] satisfies MainNavItem[],
};
