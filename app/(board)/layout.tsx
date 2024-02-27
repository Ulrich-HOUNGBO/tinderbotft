import BottomNav from "@/components/layouts/bottom-nav";
import NavBar from "@/components/layouts/nav-bar";
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";


export default async function BoardLayout({ children }: { children: React.ReactNode }) {
	  const session = await getServerSession(authOptions);

	return (
		<div className="container">
			<NavBar items={siteConfig.mainNav} session={session} />
			<div className="py-10 xl:py-20">{children}</div>
			<BottomNav />
		</div>
	);
}
