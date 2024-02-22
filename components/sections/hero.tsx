import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<div className="grid items-center gap-8 lg:grid-cols-2">
			<div className="space-y-5">
				<h1 className="text-4xl font-medium leading-tight text-gray-700 md:text-[3.5rem]">
					Send professional SMS easily, fast and reliable
				</h1>
				<p className="text-xl text-gray-500">
					We help you send professional SMS to your customers, clients, and partners.
				</p>
				<div className="flex space-x-2">
					<Button asChild>
						<Link href={routes.auth.register}>Get Started</Link>
					</Button>
					<Button variant="outline">Learn More</Button>
				</div>
			</div>

			<div className="max-lg:order-first">
				<div className="flex h-[18rem] flex-col justify-center overflow-hidden px-2 md:h-[30rem]">
					<div className="-m-2 h-full rounded-xl bg-gray-900/5 p-3 ring-1 ring-inset ring-gray-900/10 lg:-m-2 lg:rounded-2xl lg:p-3">
						<Image
							src="/images/montgolfiere.jpg"
							alt="auth-layout"
							height={500}
							width={800}
							className="size-full rounded-md	bg-white object-cover shadow-2xl ring-1 ring-gray-900/10"
						/>
					</div>
				</div>
				{/* <div className="grid gap-4 rounded-2xl bg-slate-200 p-4 md:grid-cols-3">
					<div className="h-28"></div>
					<div className="h-28"></div>
					<div className="h-28"></div>
				</div> */}
			</div>
		</div>
	);
}
