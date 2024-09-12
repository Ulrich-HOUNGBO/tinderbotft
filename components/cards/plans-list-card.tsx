import { routes } from "@/lib/routes";
import {BotsInterface, PlansInterface} from "@/types";
import Link from "next/link";
import {startBot, stopBot} from "@/services/bot/queries";
import { Button } from "../ui/button";
import {toast} from "@/components/ui/use-toast";
import {useStartBot, useStopBot} from "@/services/bot/hooks";
import {getProxyById} from "@/services/proxy/queries";

export default function PlansListCard({ props }: { props: BotsInterface }) {
	const { mutateAsync: startBotMutateAsync } = useStartBot();
	const { mutateAsync: stopBotMutateAsync } = useStopBot();

	const handleStartBot = async () => {
		try {
			await startBotMutateAsync(props.id);
			toast({
				variant: "default",
				title: "Bot démarré avec succès",
			});
		} catch (error: any) {
			if (error.response?.status === 401) {
				toast({
					variant: "destructive",
					title: "Token non valide, changez le token",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Erreur serveur, veuillez réessayer plus tard",
				});
			}
		}
	};

	const handleStopBot = async () => {
		try {
			await stopBotMutateAsync(props.id);
			toast({
				variant: "default",
				title: "Bot arrêté avec succès",
			});
		} catch (error) {
			console.log(error);
			toast({
				variant: "destructive",
				title: "Erreur serveur, veuillez réessayer plus tard",
			});
		}
	};

	return (
		<div className="group relative flex flex-col justify-between gap-y-1 rounded-xl border border-gray-200 bg-background px-5 py-6 transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-50 dark:border-foreground/30 dark:hover:bg-foreground/10">
			<h2 className="font-bold xl:text-xl">{props.bot_name}</h2>
			<div className="grid grid-cols-2 gap-4 text-sm font-medium xl:text-base [&>p:first-of-type]:border-r [&>p:first-of-type]:border-gray-300">
				<p>proxy : {props.proxy ? props.proxy.name : "non ajouté"}</p>
			</div>
			{props.status == "Running" && (
				<span className="absolute right-2 top-2 rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-green-800 dark:bg-foreground lg:text-xs">
                    En exécution
                </span>
			)}
			{props.status == "Stopped" && (
				<Button
					onClick={handleStartBot}
					className="absolute right-3 rounded-full bg-gray-300 px-2 py-1 text-xs font-medium text-green-800 dark:bg-foreground lg:text-xs"
				>
					Démarrer
				</Button>
			)}
			{props.status == "Running" && (
				<Button
					onClick={handleStopBot}
					className="absolute right-2 bottom-2 rounded-full bg-red-800 px-2 py-2 text-xs font-medium text-white dark:bg-foreground lg:text-xs"
				>
					Arrêter
				</Button>
			)}
		</div>
	);
}
