import BottomNav from "@/components/layouts/bottom-nav";
import NavBar from "@/components/layouts/nav-bar";
import { siteConfig } from "@/config/site";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container">
			<NavBar items={siteConfig.mainNav} />
			<div className="py-10">{children}</div>
			<BottomNav />
		</div>
	);
}
