"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountries } from "@/services/hooks/use-countries";
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
		<div className="flex items-center gap-1 rounded-md border">
			<Select {...eventProps}>
				<SelectTrigger className="h-11 w-32 border-none md:h-12">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{data?.map((country) => (
						<SelectItem key={`${country.code}`} value={country.code}>
							<Image src={country.flag} alt={`${country.name}'s flag`} width={24} height={24} className="h-5 w-6" />
							<span>{`+${country.callingCode}`}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				{...inputProps}
				className="border-none focus-within:ring-0 focus:ring-transparent"
				placeholder="123456789"
			/>
		</div>
	);
}
