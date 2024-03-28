import AboutSection from "@/components/sections/about";
import FeaturesSection from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import PricingSection from "@/components/sections/pricing";

export default function Homepage() {
	return (
		<div className="space-y-36">
			<Hero />
			<AboutSection />
			<FeaturesSection />
			<PricingSection />
		</div>
	);
}
