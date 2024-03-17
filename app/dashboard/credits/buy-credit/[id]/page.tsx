import React from "react";

interface BuyCreditPageProps {
	params: {
		id: string;
	};
}

export default function BuyCreditPage({ params }: BuyCreditPageProps) {
	return (
		<div>
			<h1>Buy credit page for id: {params.id}</h1>
		</div>
	);
}
