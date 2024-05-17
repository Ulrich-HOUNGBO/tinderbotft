import { siteConfig } from "@/config/site";
import Link from "next/link";
import { MouseEventHandler } from "react";

export default function Logo({ href, onClick }: { href?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
	return (
		<Link aria-label={siteConfig.name} href={href ?? "/"} onClick={onClick}>
			{/* <Image src="/images/marksafeto-logo.svg" alt="marksafeto-logo" width={35.33} height={27.67} /> */}
			<h3 className="text-xl font-semibold text-gray-800 dark:text-foreground/90">{siteConfig.name}</h3>
		</Link>
	);
}
