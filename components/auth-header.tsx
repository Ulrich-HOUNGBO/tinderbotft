type Props = {
	title: string;
	description: string;
};

export default function AuthHeader({ title, description }: Props) {
	return (
		<div className="mb-5 space-y-1">
			<h3 className="text-xl xl:text-3xl font-semibold text-gray-600">{title}</h3>
			<p className="xl:text-lg text-muted-foreground">{description}</p>
		</div>
	);
}
