import BottomNav from "@/components/layouts/bottom-nav";
import NavBar from "@/components/layouts/nav-bar";

export default function BoardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="container">
			<NavBar />
			<div className="py-10">{children}</div>
			<BottomNav />
		</div>
	);
}
