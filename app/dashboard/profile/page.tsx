import { Breadcrumbs } from "@/components/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Profile",
	description: "Dashboard profile page",
};

export default function ProfilePage() {
	return (
		<div>
			<Breadcrumbs segments={[{ title: "Profile" }]} />
		</div>
	);
}
