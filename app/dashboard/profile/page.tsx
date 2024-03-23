import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Profile",
	description: "Dashboard profile page",
};

export default function ProfilePage() {
	return (
		<div>
			<h1 className="font-heading">Profile</h1>
		</div>
	);
}
