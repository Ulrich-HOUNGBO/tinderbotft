import axios from "@/lib/axios";

export interface CountryInterface {
	callingCode: string;
	code: string;
	flag: string;
	name: string;
}
/**
 * Query to get all countries calling code and flag
 * @returns {Promise<CountryInterface[]>} - List of countries calling code and flag
 */
export const getCountries = async (): Promise<CountryInterface[]> => {
	const data = await axios.get("https://restcountries.com/v2/all");

	return data.data.map((contry: any) => ({
		callingCode: contry.callingCodes[0],
		code: contry.alpha2Code,
		flag: contry.flags.svg,
		name: contry.name,
	}));
};
