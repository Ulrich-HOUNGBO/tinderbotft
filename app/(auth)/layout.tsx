import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid lg:grid-cols-2 h-screen">
			<div className="container relative flex flex-col justify-center max-w-md mx-5 mb-10 md:mb-0 md:max-w-xl md:mx-auto">
				{children}
				<p className="absolute bottom-5 right-1/2 translate-x-1/2 text-[10px] md:text-xs text-gray-400 ">
					© 2024 MarkSafeTo. All rights reserved.
				</p>
			</div>
			<div className="hidden lg:block overflow-hidden">
				<Image src="/images/montgolfiere.jpg" alt="auth-layout" height={2400} width={3600} className="h-full w-full" />
			</div>
			{/* Use bellow code later on hero section */}
			{/* 
			<div className="hidden lg:flex flex-col justify-center overflow-hidden px-10 py-16 ">
				<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
					<Image
						src="/images/montgolfiere.jpg"
						alt="auth-layout"
						height={2400}
						width={3600}
						className="rounded-md bg-white p-20	shadow-2xl ring-1 ring-gray-90/10"
					/>
				</div>
			</div>
			 */}
		</div>
	);
}
