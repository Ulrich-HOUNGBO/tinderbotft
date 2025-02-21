import React, {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as z from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox"; // Assurez-vous d'importer le composant Checkbox
import {toast} from "@/components/ui/use-toast";
import {useAddAction} from "@/services/actions/hooks";
import {createActionCredentials} from "@/services/actions/queries";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";
import {DualSlider} from "@/components/ui/dual-slider";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";

const fieldSchema = (daysNumber: number) =>
    z.object({
        min_swipe_times: z.number().min(0).max(1000).optional(),
        max_swipe_times: z.number().min(0).max(1000).optional(),
        min_right_swipe_percentage: z.number().min(0).max(100).optional(),
        max_right_swipe_percentage: z.number().min(0).max(100).optional(),
        scheduled_time: z.string().default("00:00"),
        scheduled_time_2: z.string().default("00:00").optional(),
        related_day: z.number().min(1).max(daysNumber),
        insta_list: z.string().optional(),
        bio_list: z.string().optional(),
        type: z.string(),
    });

const formSchema = (daysNumber: number) =>
    z.object({
        actions: z.array(fieldSchema(daysNumber)),
    });

interface ConfigStrategyFormProps {
    daysNumber: number;
    strategyId: string;
    strategyActions: any[] | undefined;
}

export default function ConfigStrategyForm({
    daysNumber,
    strategyId,
    strategyActions,
}: Readonly<ConfigStrategyFormProps>) {
    const router = useRouter();
    const addMutation = useAddAction();
    const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
        resolver: zodResolver(formSchema(daysNumber)),
        defaultValues: {
            //@ts-ignore
            actions: strategyActions && strategyActions.length > 0
                ? strategyActions.map((action) => ({
                    min_swipe_times: action.min_swipe_times ?? undefined,
                    max_swipe_times: action.max_swipe_times ?? undefined,
                    min_right_swipe_percentage: action.min_right_swipe_percentage ?? undefined,
                    max_right_swipe_percentage: action.max_right_swipe_percentage ?? undefined,
                    scheduled_time: action.scheduled_time ?? "00:00",
                    scheduled_time_2: action.scheduled_time_2 ?? undefined,
                    related_day: action.related_day,
                    insta_list: action.insta_list ?? "",
                    bio_list: action.bio_list ?? "",
                    type: action.type,
                }))
                : [
                    {
                        min_swipe_times: 0,
                        max_swipe_times: 1000,
                        min_right_swipe_percentage: 0,
                        max_right_swipe_percentage: 100,
                        scheduled_time: "00:00",
                        scheduled_time_2: null,
                        related_day: 1,
                        type: "swiping",
                    },
                ],
        },
        mode: "all",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "actions",
    });

    const onSubmit = async (data: z.infer<ReturnType<typeof formSchema>>) => {

        const payload: createActionCredentials = {
            strategy: strategyId,
            //@ts-ignore
            actions: data.actions,
        };

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
                        title: "error submitting data",
                        description: error.response.data.error,
                    });
                },
            });
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    // Count the number of fields with type "swiping" and "add-bio"
    const swipingFieldsCount = fields.filter(field => field.type === "swiping").length;
    const addBioFieldsCount = fields.filter(field => field.type === "add-bio").length;

    const handleAddBioField = () => {
        if (addBioFieldsCount < daysNumber) {
            append({
                insta_list: "",
                bio_list: "",
                scheduled_time: "00:00",
                scheduled_time_2: undefined,
                related_day: addBioFieldsCount + 1,
                type: "add-bio",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Limite atteinte",
                description: `You cannot add more than ${daysNumber} add-bio action.`,
            });
        }
    };

    const handleAddSwipingField = () => {
        if (swipingFieldsCount < daysNumber) {
            append({
                min_swipe_times: 0,
                max_swipe_times: 1000,
                min_right_swipe_percentage: 0,
                max_right_swipe_percentage: 100,
                scheduled_time: "00:00",
                scheduled_time_2: undefined,
                related_day: swipingFieldsCount + 1,
                type: "swiping",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Limite atteinte",
                description: `You cannot add more than ${daysNumber} swiping action.`,
            });
        }
    };

    const handleCopyField = (index: number) => {
        const allFields = form.getValues("actions");
        const fieldToCopy = allFields[index];
        const copiedField = {
            ...fieldToCopy,
            related_day: fields.length + 1,
        };

        append(copiedField);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                className="grid max-w-2xl gap-4 md:gap-7"
            >
                {fields.map((field, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [isScheduledTime2Enabled, setIsScheduledTime2Enabled] = useState(!!field.scheduled_time_2);

                    return (
                        <div key={field.id} className="mb-4 rounded-md border p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-medium">Action {index + 1}</h3>
                                <Badge className={
                                    field.type === "swiping"
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                                }

                                >{field.type} </Badge>
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
                                {field.type === "swiping" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name={`actions.${index}.min_swipe_times`}
                                            render={({ field: minField }) => (
                                                <FormField
                                                    control={form.control}
                                                    name={`actions.${index}.max_swipe_times`}
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
                                            name={`actions.${index}.min_right_swipe_percentage`}
                                            render={({ field: minField }) => (
                                                <FormField
                                                    control={form.control}
                                                    name={`actions.${index}.max_right_swipe_percentage`}
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
                                    </>
                                )}
                                {field.type === "add-bio" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name={`actions.${index}.insta_list`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Instagram usernames list</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Instagram usernames"
                                                            {...field}

                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`actions.${index}.bio_list`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bio List</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Bios"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                                <FormField
                                    control={form.control}
                                    name={`actions.${index}.scheduled_time`}
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
                                    name={`actions.${index}.scheduled_time_2`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Schedule time 2 (Optional)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="time"
                                                    placeholder="Schedule time 2"
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    onChange={(e) => field.onChange(e.target.value || null)}
                                                    disabled={!isScheduledTime2Enabled}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormControl>
                                        <Checkbox
                                            checked={isScheduledTime2Enabled}
                                                onCheckedChange={(checked) => setIsScheduledTime2Enabled(checked === true)}
/>                                        />
                                        <FormLabel>Enable Schedule time 2</FormLabel>
                                    </FormControl>
                                </FormItem>
                                <FormField
                                    control={form.control}
                                    name={`actions.${index}.related_day`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Associated day</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? `Day ${field.value}`
                                                                : "Select day"}
                                                            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search day..." />
                                                        <CommandList>
                                                            <CommandEmpty>No day found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {[...Array(daysNumber)].map((_, dayIndex) => (
                                                                    <CommandItem
                                                                        key={dayIndex}
                                                                        onSelect={() =>
                                                                            form.setValue(
                                                                                `actions.${index}.related_day`,
                                                                                dayIndex + 1
                                                                            )
                                                                        }
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                field.value === dayIndex + 1
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        Day {dayIndex + 1}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-between">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                className="w-fit bg-blue-500 hover:bg-blue-600"
                                disabled={ swipingFieldsCount >= daysNumber && addBioFieldsCount >= daysNumber}
                            >
                                Add new action
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={handleAddSwipingField} disabled={swipingFieldsCount >= daysNumber}>
                                Swiping
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleAddBioField} disabled={addBioFieldsCount >= daysNumber}>
                                Add-bio
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        type="submit"
                        className="w-fit bg-green-500 hover:bg-green-600"
                    >
                        config strategy
                    </Button>
                </div>
            </form>
        </Form>
    );
}