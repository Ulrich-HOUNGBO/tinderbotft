import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Hero() {
	return (
		<div className="grid lg:grid-cols-5 gap-8">
			<div className="space-y-5 lg:col-span-2">
				<h1 className="font-heading text-4xl md:text-[3.2rem] leading-tight text-gray-700 font-medium">
					Send professional SMS easily, fast and reliable
				</h1>
				<p className="font-heading text-xl">
					We help you send professional SMS to your customers, clients, and partners.
				</p>
				<div className="flex space-x-2">
					<Button>Get Started</Button>
					<Button variant="outline">Learn More</Button>
				</div>
			</div>

			<div className="max-lg:order-first lg:col-span-3 space-y-7">
				<div className="flex flex-col justify-center overflow-hidden px-4 h-[18rem] md:h-[28rem]">
					<div className="-m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-2 lg:rounded-2xl p-3 lg:p-4 h-full">
						<Image
							src="/images/montgolfiere.jpg"
							alt="auth-layout"
							height={500}
							width={800}
							className="rounded-md bg-white	shadow-2xl ring-1 ring-gray-90/10 h-full w-full object-cover"
						/>
					</div>
				</div>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="h-32 bg-slate-100 rounded-2xl"></div>
					<div className="h-32 bg-slate-100 rounded-2xl"></div>
					<div className="h-32 bg-slate-100 rounded-2xl"></div>
				</div>
			</div>
		</div>
	);
}
