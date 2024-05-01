"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountries } from "@/services/countries/hooks";
import { SelectProps } from "@radix-ui/react-select";
import Image from "next/image";
import { Input, InputProps } from "./input";

type Props = {
	eventProps: SelectProps;
	inputProps: InputProps;
};

export default function PhoneInput({ eventProps, inputProps }: Props) {
	const { data } = useCountries();

	return (
		<div className="flex items-center gap-1 rounded-md border focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
			<Select {...eventProps}>
				<SelectTrigger className="h-11 w-32 border-none md:h-12">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{data?.map((country, index) => (
						<SelectItem key={`${country.code}`} value={`${country.code + "+" + country.callingCode}`} defaultValue="BJ">
							<Image src={country.flag} alt={`${country.name}'s flag`} width={24} height={20} />
							<span>{`+${country.callingCode}`}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				{...inputProps}
				type="number"
				className="border-none focus-visible:ring-transparent focus-visible:ring-offset-0"
				placeholder="123456789"
			/>
		</div>
	);
}
