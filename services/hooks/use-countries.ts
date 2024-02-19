import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../queries/country";

export const useCountries = () => {
	return useQuery({
		queryKey: ["countries-list"],
		queryFn: getCountries,
	});
};
