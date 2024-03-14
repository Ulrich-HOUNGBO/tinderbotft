import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import MobileNav from "./mobile-nav";
import NavBar from "./nav-bar";

export default async function SiteHeader() {
	const session = await getServerSession(authOptions);

	return (
		<header className="sticky top-0 z-50 w-full bg-background">
			<div className="flex h-16 items-center">
				<NavBar items={siteConfig.mainNav} session={session} />
				<MobileNav mainNavItems={siteConfig.mainNav} session={session} />
			</div>
		</header>
	);
}
