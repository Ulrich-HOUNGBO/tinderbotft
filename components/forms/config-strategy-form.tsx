import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { botSchema } from "@/lib/validations/bot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useAddBot } from "@/services/bot/hooks";
import { createBotCredentials } from "@/services/bot/queries";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { DualSlider } from "@/components/ui/dual-slider";

type Credentials = z.infer<typeof botSchema>;

const fieldSchema = (daysNumber: number) =>
  z.object({
    min_swipe_times: z.number().min(0).max(1000),
    max_swipe_times: z.number().min(0).max(1000),
    min_right_swipe_percentage: z.number().min(0).max(100),
    max_right_swipe_percentage: z.number().min(0).max(100),
    refresh_token: z.string().optional(),
    scheduled_time: z.string().default("00:00"),
    scheduled_time_2: z.string().default("00:00"),
    related_day: z.number().min(1).max(daysNumber),
  });

const formSchema = (daysNumber: number) =>
  z.object({
    bot_settings: z.array(fieldSchema(daysNumber)),
  });

interface ConfigStrategyFormProps {
  daysNumber: number;
  strategyId: string;
}

export default function ConfigStrategyForm({
  daysNumber,
  strategyId,
}: Readonly<ConfigStrategyFormProps>) {
  const router = useRouter();
  const addMutation = useAddBot();
  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(daysNumber)),
    defaultValues: {
      bot_settings: [
        {
          min_swipe_times: 0,
          max_swipe_times: 1000,
          min_right_swipe_percentage: 0,
          max_right_swipe_percentage: 100,
          refresh_token: "",
          scheduled_time: "00:00",
          scheduled_time_2: "00:00",
          related_day: 1,
        },
      ],
    },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bot_settings",
  });

  const onSubmit = async (data: z.infer<ReturnType<typeof formSchema>>) => {
    const payload: createBotCredentials = {
      strategy: strategyId,
      bot_settings: data.bot_settings,
    };
    console.log("Submitted Data:", payload);

    try {
      await addMutation.mutateAsync(payload, {
        onSuccess: async () => {
          toast({
            title: "Strategy added successfully",
          });
          router.push(routes.dashboard.strategy.index);
        },
        onError: (error: any) => {
          toast({
            variant: "destructive",
            title: "Une erreur s'est produite",
            description: error.response.data,
          });
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleAddField = () => {
    if (fields.length < daysNumber) {
      append({
        min_swipe_times: 0,
        max_swipe_times: 500,
        min_right_swipe_percentage: 0,
        max_right_swipe_percentage: 100,
        refresh_token: "",
        scheduled_time: "00:00",
        scheduled_time_2: "00:00",
        related_day: fields.length + 1,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Limite atteinte",
        description: `Vous ne pouvez pas ajouter plus de ${daysNumber} ensembles.`,
      });
    }
  };

  const handleCopyField = (index: number) => {
    // Get the latest values of all form fields
    const allFields = form.getValues("bot_settings");

    // Copy the field using the latest values from the form state
    const fieldToCopy = allFields[index];
    console.log("Field to copy:", fieldToCopy);
    console.log("index:", index);
    const copiedField = {
      ...fieldToCopy,
      related_day: fields.length + 1, // Set the correct day for the new field
    };

    append(copiedField);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className="grid max-w-2xl gap-4 md:gap-7"
      >
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 rounded-md border p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Day {index + 1}</h3>
              <div>
                <Button
                  variant="destructive"
                  onClick={() => remove(index)}
                  type="button"
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleCopyField(index)}
                  type="button"
                  className="ml-2"
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
              <FormField
                control={form.control}
                name={`bot_settings.${index}.min_swipe_times`}
                render={({ field: minField }) => (
                  <FormField
                    control={form.control}
                    name={`bot_settings.${index}.max_swipe_times`}
                    render={({ field: maxField }) => (
                      <DualSlider
                        minField={minField}
                        maxField={maxField}
                        label="Swipe number (min et max)"
                        min={0}
                        max={1000}
                      />
                    )}
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`bot_settings.${index}.min_right_swipe_percentage`}
                render={({ field: minField }) => (
                  <FormField
                    control={form.control}
                    name={`bot_settings.${index}.max_right_swipe_percentage`}
                    render={({ field: maxField }) => (
                      <DualSlider
                        minField={minField}
                        maxField={maxField}
                        label="Like percentage (min et max)"
                        min={0}
                        max={100}
                      />
                    )}
                  />
                )}
              />
              <FormField
                control={form.control}
                name={`bot_settings.${index}.scheduled_time`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Schedule time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`bot_settings.${index}.scheduled_time_2`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule time 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Schedule time 2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`bot_settings.${index}.related_day`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associated day</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value.toString()}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select associated day" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(daysNumber)].map((_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={handleAddField}
            className="w-fit bg-blue-500 hover:bg-blue-600"
            disabled={fields.length >= daysNumber}
          >
            Add new action
          </Button>
          <Button
            type="submit"
            className="w-fit bg-green-500 hover:bg-green-600"
          >
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
