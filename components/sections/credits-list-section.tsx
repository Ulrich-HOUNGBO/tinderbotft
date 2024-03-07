import Link from "next/link";
import React from "react";

export default function CreditsListSection() {
	return (
		<div className="space-y-3">
			<h1 className="font-heading">Credit Packs</h1>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				<Link
					href="#"
					className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-background px-5 py-6 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50"
				>
					<h2 className="font-bold xl:text-xl">5000 FCFA</h2>
					<div className="grid grid-cols-2 gap-4 text-sm font-medium xl:text-base [&>p:first-of-type]:border-r [&>p:first-of-type]:border-gray-300">
						<p>credits: 20</p>
						<p>+20 SMS</p>
					</div>
					<span className="absolute right-2 top-2 rounded-md bg-gray-700 px-2 py-1 text-[10px] font-medium text-white lg:text-xs">
						Recommended
					</span>
				</Link>

				<Link
					href="#"
					className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-background px-5 py-6 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50"
				>
					<h2 className="font-bold xl:text-xl">5000 FCFA</h2>
					<div className="grid grid-cols-2 gap-4 text-sm font-medium xl:text-base [&>p:first-of-type]:border-r [&>p:first-of-type]:border-gray-300">
						<p>credits: 20</p>
						<p>+20 SMS</p>
					</div>
				</Link>
				<Link
					href="#"
					className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-background px-5 py-6 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50"
				>
					<h2 className="font-bold xl:text-xl">5000 FCFA</h2>
					<div className="grid grid-cols-2 gap-4 text-sm font-medium xl:text-base [&>p:first-of-type]:border-r [&>p:first-of-type]:border-gray-300">
						<p>credits: 20</p>
						<p>+20 SMS</p>
					</div>
				</Link>
				<Link
					href="#"
					className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-background px-5 py-6 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50"
				>
					<h2 className="font-bold xl:text-xl">5000 FCFA</h2>
					<div className="grid grid-cols-2 gap-4 text-sm font-medium xl:text-base [&>p:first-of-type]:border-r [&>p:first-of-type]:border-gray-300">
						<p>credits: 20</p>
						<p>+20 SMS</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
