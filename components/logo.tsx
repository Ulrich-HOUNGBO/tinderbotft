import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
	return (
		<Link aria-label={siteConfig.name} href="/">
			<Image src="/images/marksafeto-logo.svg" alt="marksafeto-logo" width={35.33} height={27.67} />
		</Link>
	);
}
