import MoneyBagIcon from "../icons/money-bag";
import SmsSentIcon from "../icons/sms-sent";

export type StatsCardProps = {
	label: string;
	type: "credit" | "sms";
	value: number;
};

export default function StatsCard({ props }: { props: StatsCardProps }) {
	return (
		<div className="flex flex-col gap-y-2 rounded-xl border border-slate-300 p-5 dark:border-foreground/30">
			<div className="flex items-center justify-between">
				<h1 className="font-heading">{props.label}</h1>
				{props.type === "credit" ? (
					<MoneyBagIcon className="text-slate-600 dark:text-foreground" />
				) : (
					<SmsSentIcon className="text-slate-600 dark:text-foreground" />
				)}
			</div>
			<span className="text-lg font-medium xl:text-2xl">
				{props.type === "credit" ? `${props.value} credit(s)` : `${props.value}`}
			</span>
		</div>
	);
}
