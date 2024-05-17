import { getCountries } from "@/services/countries/queries";
import { useQuery } from "@tanstack/react-query";

// --------------- QUERY & MUTATION KEYS --------------- //
export const countriesQueryKeys = {
	countriesKey: ["countries-list"],
	countryKey: (id: string) => ["country", id],
};

// --------------- QUERIES HOOKS --------------- //
export const useCountries = () => {
	return useQuery({
		queryKey: countriesQueryKeys.countriesKey,
		queryFn: getCountries,
	});
};
