"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationsProps = {
	page: string;
	pageCount: number;
	siblingCount?: number;
	createQueryString: (name: string, value: string) => string;
};

export default function Paginations({ page, pageCount, createQueryString, siblingCount = 1 }: PaginationsProps) {
	const router = useRouter();
	const pathname = usePathname();

	// Memorize pagination range to avoid unnecessary re-renders
	const paginationRange = useMemo(() => {
		const delta = siblingCount + 2;

		const range = [];
		for (let i = Math.max(2, Number(page) - delta); i <= Math.min(pageCount - 1, Number(page) + delta); i++) {
			range.push(i);
		}

		if (Number(page) - delta > 2) {
			range.unshift("...");
		}
		if (Number(page) + delta < pageCount - 1) {
			range.push("...");
		}

		range.unshift(1);
		if (pageCount !== 1) {
			range.push(pageCount);
		}

		return range;
	}, [pageCount, page, siblingCount]);

	console.log("paginationRange", paginationRange);

	return (
		<div className="mt-8 flex flex-wrap items-center justify-center gap-2">
			<Button
				aria-label="Go to previous page"
				variant="ghost"
				onClick={() => {
					router.push(`${pathname}?${createQueryString("page", (Number(page) - 1).toString())}`);
				}}
				disabled={Number(page) === 1}
			>
				<ChevronLeft className="size-4" />
				<span>Précédent</span>
			</Button>

			{paginationRange.map((pageNumber, i) =>
				pageNumber === "..." ? (
					<Button aria-label="Page separator" key={i} variant="outline" size="icon" className="size-8" disabled>
						...
					</Button>
				) : (
					<Button
						aria-label={`Page ${pageNumber}`}
						key={i}
						variant={Number(page) === pageNumber ? "default" : "outline"}
						size="icon"
						className="size-8 dark:text-foreground"
						onClick={() => {
							router.push(`${pathname}?${createQueryString("page", pageNumber.toString())}`);
						}}
						// disabled={isPending}
					>
						{pageNumber}
					</Button>
				)
			)}

			<Button
				aria-label="Go to next page"
				variant="ghost"
				onClick={() => {
					router.push(`${pathname}?${createQueryString("page", (Number(page) + 1).toString())}`);
				}}
				// disabled={Number(page) === (pageCount ?? 10)}
				// TODO: Fix this later
				disabled={Number(page) === 10}
			>
				<span>Suivant</span>
				<ChevronRight className="size-4" aria-hidden="true" />
			</Button>
		</div>
	);
}
