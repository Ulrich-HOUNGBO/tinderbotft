export type StatsCardProps = {
	type: "credit" | "sms";
	value: number;
};

export default function StatsCard({ props }: { props: StatsCardProps }) {
	return (
		<div className="space-y-2 rounded-xl border border-slate-300 p-5">
			<div>
				<h1 className="font-heading">{props.type === "credit" ? "Available Credit" : "Sms Sent"}</h1>
			</div>
			<span className="text-lg font-semibold xl:text-2xl">
				{props.type === "credit" ? `${props.value} credit(s)` : `${props.value}/0`}
			</span>
		</div>
	);
}
