import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toogle";
import Link from "next/link";

export default function BottomNav() {
	return (
		<div className="flex items-center justify-between bg-gray-100">
			<Link aria-label={siteConfig.name} href="/">
				<h3 className="text-xl font-semibold text-gray-800">{siteConfig.name}</h3>
			</Link>
			<ThemeToggle />
		</div>
	);
}
