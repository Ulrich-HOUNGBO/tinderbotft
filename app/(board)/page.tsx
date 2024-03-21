import Payment from "@/components/payment";
import AboutSection from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import PricingSection from "@/components/sections/pricing";
import React from "react";

export default function Homepage() {
	return (
		<div className="space-y-36">
			<Hero />
			<AboutSection />
			<Payment />
			<PricingSection />
		</div>
	);
}
