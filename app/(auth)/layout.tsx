import Logo from "@/components/logo";
import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid h-screen lg:grid-cols-2">
			<div className="container relative flex max-w-md flex-col justify-between py-8 md:mx-auto md:max-w-xl">
				<Logo />
				{children}
				<p className="w-full text-center text-[10px] text-gray-400 md:text-xs">
					© 2024 AutoDateSwiper. Tous droits réservés.
				</p>
			</div>
			<div className="hidden h-screen overflow-hidden lg:block">
				<Image
					src="/images/image-layout-2.png"
					alt="auth-layout"
					height={1920}
					width={1690}
					priority
					className="size-full object-cover"
				/>
			</div>
		</div>
	);
}
