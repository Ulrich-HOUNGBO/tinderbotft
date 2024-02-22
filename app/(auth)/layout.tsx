import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid h-screen lg:grid-cols-2">
			<div className="container relative flex max-w-md flex-col justify-center md:mx-auto md:max-w-xl">
				{children}
				<p className="absolute bottom-5 right-1/2 translate-x-1/2 text-[10px] text-gray-400 md:text-xs ">
					© 2024 MarkSafeTo. All rights reserved.
				</p>
			</div>
			<div className="hidden h-screen overflow-hidden lg:block">
				<Image
					src="/images/montgolfiere.jpg"
					alt="auth-layout"
					height={3600}
					width={2400}
					priority
					className="size-full object-cover"
				/>
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
