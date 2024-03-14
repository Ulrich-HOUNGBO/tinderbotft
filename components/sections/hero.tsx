import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<div className="grid items-center gap-8 lg:grid-cols-2 xl:gap-20">
			<div className="space-y-5">
				<h1 className="text-3xl leading-tight text-gray-700 max-lg:text-center md:text-[2.6rem] xl:text-4xl">
					Send professional SMS easily, fast and reliable
				</h1>
				<p className="text-gray-400 max-lg:text-center xl:text-xl">
					We help you send professional SMS to your customers, clients, and partners.
				</p>
				<div className="flex gap-x-6 max-lg:justify-center">
					<Button asChild>
						<Link href={routes.auth.register}>Get Started</Link>
					</Button>
					<Button variant="outline">Learn More</Button>
				</div>
				<div className="grid gap-4 rounded-xl bg-slate-100/50 p-4 md:grid-cols-2 [&>div:first-of-type]:md:border-r [&>div:first-of-type]:md:border-gray-400">
					<div>
						<h1>85%</h1>
						<p>Earn in the first month</p>
					</div>
					<div>
						<h1>+12k</h1>
						<p>Average profit per month</p>
					</div>
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
			</div>
		</div>
	);
}
