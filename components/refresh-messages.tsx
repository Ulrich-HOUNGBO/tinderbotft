"use client";

import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import ReloadIcon from "./icons/reload";
import { Button } from "./ui/button";

type RefreshMessagesProps = {
	disabled: boolean;
	setDisabled: (value: boolean) => void;
	isLoading: boolean;
};

export default function RefreshMessages({ disabled, setDisabled, isLoading }: RefreshMessagesProps) {
	const queryClient = useQueryClient();

	const handleRefreshMessages = async () => {
		setDisabled(true);
		await queryClient.invalidateQueries({
			queryKey: ["messages-list"],
		});
		setDisabled(false);
	};

	return (
		<Button variant="dashboard" disabled={disabled || isLoading} onClick={handleRefreshMessages}>
			<ReloadIcon className={cn("mr-2 size-3 dark:text-foreground", disabled && "animate-spin")} />
			<span className="text-xs">Rafraîchir</span>
		</Button>
	);
}
