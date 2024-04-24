import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ href }: { href?: string }) {
	return (
		<Link aria-label={siteConfig.name} href={href ?? "/"}>
			<Image src="/images/marksafeto-logo.svg" alt="marksafeto-logo" width={35.33} height={27.67} />
		</Link>
	);
}
