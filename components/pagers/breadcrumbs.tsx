import * as React from "react";
import Link from "next/link";

import { cn, truncate } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<"nav"> {
	segments: {
		title: string;
		href?: string;
	}[];
	separator?: React.ComponentType<{ className?: string }>;
	truncationLength?: number;
}

export function Breadcrumbs({ segments, separator, truncationLength = 0, className, ...props }: BreadcrumbsProps) {
	const SeparatorIcon = separator ?? ChevronRightIcon;

	return (
		<nav
			aria-label="breadcrumbs"
			className={cn(
				"font-heading flex w-full items-center overflow-auto text-sm font-medium text-muted-foreground",
				className
			)}
			{...props}
		>
			{segments.map((segment, index) => {
				const isLastSegment = index === segments.length - 1;

				return (
					<React.Fragment key={segment.href}>
						<Link
							aria-current={isLastSegment ? "page" : undefined}
							href={segment.href ?? "#"}
							className={cn(
								"font-medium text-lg truncate transition-colors hover:text-foreground",
								isLastSegment ? "text-foreground" : "text-muted-foreground"
							)}
						>
							{truncationLength > 0 && segment.title ? truncate(segment.title, truncationLength) : segment.title}
						</Link>
						{!isLastSegment && <SeparatorIcon className="mx-1 size-4" aria-hidden="true" />}
					</React.Fragment>
				);
			})}
		</nav>
	);
}
