type Props = {
	title: string;
	description: string;
};

export default function AuthHeader({ title, description }: Readonly<Props>) {
	return (
		<div className="mb-5 space-y-1 font-heading">
			<h3 className="text-lg font-medium text-gray-600 dark:text-foreground/80 md:text-xl xl:text-3xl">{title}</h3>
			<p className="text-sm text-muted-foreground xl:text-base">{description}</p>
		</div>
	);
}
