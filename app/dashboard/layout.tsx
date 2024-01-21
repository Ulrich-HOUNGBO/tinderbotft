import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-row gap-x-5 h-screen">
			<div className="w-72 bg-slate-300">SideNav</div>
			<div className="w-full">{children}</div>
		</div>
	);
}
