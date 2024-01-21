import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid md:grid-cols-2 h-screen">
			<div>{children}</div>
			<div className="bg-green-100">Layout</div>
		</div>
	);
}
