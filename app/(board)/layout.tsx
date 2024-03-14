import BottomNav from "@/components/layouts/bottom-nav";
import SiteHeader from "@/components/layouts/site-header";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container">
			<SiteHeader />
			<main className="py-16 lg:py-20">{children}</main>
			<BottomNav />
		</div>
	);
}
