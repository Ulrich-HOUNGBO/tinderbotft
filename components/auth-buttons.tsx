import { routes } from "@/lib/routes";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthButtons({ session, className }: { session: Session | null; className?: string }) {
	return (
		<>
			{session ? (
				<Button asChild variant="dashboard" className={`${className}`}>
					<Link href={routes.dashboard.home}>Dashboard</Link>
				</Button>
			) : (
				<div className={`${className} items-center space-x-3 lg:space-x-4 `}>
					<Button asChild>
						<Link href={routes.auth.login}>Login</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href={routes.auth.register}>Create an account</Link>
					</Button>
				</div>
			)}
		</>
	);
}
