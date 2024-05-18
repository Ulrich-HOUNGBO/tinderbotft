import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import ProfileForm from "@/components/forms/profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard - Profile",
	description: "Dashboard profile page",
};

export default function ProfilePage() {
	return (
		<div className="space-y-5">
			<Breadcrumbs segments={[{ title: "Profile" }]} />
			<ProfileForm />
		</div>
	);
}
