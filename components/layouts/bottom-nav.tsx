import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toogle";
import Link from "next/link";

export default function BottomNav() {
	return (
		<div className="bg-gray-100 flex items-center justify-between">
			<Link aria-label={siteConfig.name} href="/">
				<h3 className="font-semibold text-xl text-gray-800">{siteConfig.name}</h3>
			</Link>
			<ThemeToggle />
		</div>
	);
}
