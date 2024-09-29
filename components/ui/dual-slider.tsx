import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import React from "react";

const DualSlider = ({
  minField,
  maxField,
  label,
  min,
  max,
}: {
  minField: any;
  maxField: any;
  label: string;
  min: number;
  max: number;
}) => {
  const values = [minField.value, maxField.value]; // Array with min and max values

  const handleChange = (newValues: number[]) => {
    minField.onChange(newValues[0]); // Update min value
    maxField.onChange(newValues[1]); // Update max value
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Slider
          min={min}
          max={max}
          value={values}
          onValueChange={handleChange}
          step={1}
        />
      </FormControl>
      <div className="mt-2 flex justify-between">
        <span>{values[0]}</span> {/* Min value */}
        <span>{values[1]}</span> {/* Max value */}
      </div>
      <FormMessage />
    </FormItem>
  );
};

export { DualSlider };
