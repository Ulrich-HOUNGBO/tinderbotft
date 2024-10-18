"use client";

import {useRouter} from "next/navigation";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {accountSchema} from "@/lib/validations/account";
import {createBotAccountCredentials} from "@/services/bot-account/queries";
import {useAddBotaccount, useUpdateBotaccount,} from "@/services/bot-account/hooks";
import React from "react";
import {useStrategies} from "@/services/strategy/hooks";
import {Check, ChevronsUpDown, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {routes} from "@/lib/routes";
import {BotAccountInterface} from "@/types";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command";
import {useModels} from "@/services/models/hooks";

type Credentials = z.infer<typeof accountSchema>;

interface AddOrUpdateAccountFormProps {
    mode: "add" | "update";
    initialData?: BotAccountInterface;
}

export default function AddOrUpdateAccountForm({
                                                   mode,
                                                   initialData,
                                               }: Readonly<AddOrUpdateAccountFormProps>) {
    const router = useRouter();
    const addMutation = useAddBotaccount();
    const updateMutation = useUpdateBotaccount(initialData?.id ?? "");
    const {data: strategies = []} = useStrategies();
    const {data: models = []} = useModels();

    const form = useForm<Credentials>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            modele:
                typeof initialData?.modele === "object"
                    ? initialData?.modele?.id
                    : initialData?.modele ?? undefined,
            token: initialData?.token ?? "",
            refresh_token: initialData?.refresh_token ?? "",
            strategy:
                typeof initialData?.strategy === "object"
                    ? initialData?.strategy?.id
                    : initialData?.strategy ?? undefined,
        },
        mode: "all",
    });

    const onSubmit = async (data: Credentials) => {
        // Create a copy of the form data
        const payload = {...data};

        // Remove the strategy field if it is not a valid UUID
        if (!data.strategy) {
            payload.strategy = undefined; // Ensure strategy is not sent as null or empty
        }

        if (mode === "add") {
            await addMutation.mutateAsync(
                payload as unknown as createBotAccountCredentials,
                {
                    onSuccess: async () => {
                        toast({
                            title: "Compte créé avec succès",
                        });
                        router.push(routes.dashboard.account.index);
                    },
                    onError: (error: any) => {
                        toast({
                            variant: "destructive",
                            title: "Une erreur s'est produite",
                            description: error.response.data.error,
                        });
                    },
                },
            );
        } else {
            await updateMutation.mutateAsync(
                payload as unknown as createBotAccountCredentials,
                {
                    onSuccess: async () => {
                        toast({
                            title: "Compte mis à jour avec succès",
                        });
                        router.push(routes.dashboard.account.index);
                    },
                    onError: (error: any) => {
                        toast({
                            variant: "destructive",
                            title: "Une erreur s'est produite",
                            description: error.response.data.error,
                        });
                    },
                },
            );
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                className="grid max-w-2xl gap-4 md:gap-7"
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nom du compte</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du compte" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="modele"
                        render={({field}) => (
                            <FormItem className="mt-0 ">
                                <FormLabel>Model</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between h-11 md:h-12",
                                                    !field.value && "text-muted-foreground",
                                                )}
                                            >
                                                {field.value
                                                    ? models.find(
                                                        (model) => model.id === field.value,
                                                    )?.name
                                                    : "Select strategy"}
                                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search proxy..."/>
                                            <CommandList>
                                                <CommandEmpty>No strategy found.</CommandEmpty>
                                                <CommandGroup>
                                                    {models.map((model) => (
                                                        <CommandItem
                                                            value={model.name}
                                                            key={model.id}
                                                            onSelect={() => {
                                                                form.setValue("modele", model.id);
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    model.id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0",
                                                                )}
                                                            />
                                                            {model.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Token</FormLabel>
                                <FormControl>
                                    <Input placeholder="Token du compte" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="refresh_token"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Refresh Token</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Refresh Token"
                                        {...field}
                                        value={field.value ?? ""}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="strategy"
                    render={({field}) => (
                        <FormItem className="mt-0 ">
                            <FormLabel>Strategy</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between h-11 md:h-12",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? strategies.find(
                                                    (strategy) => strategy.id === field.value,
                                                )?.name
                                                : "Select strategy"}
                                            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search proxy..."/>
                                        <CommandList>
                                            <CommandEmpty>No strategy found.</CommandEmpty>
                                            <CommandGroup>
                                                {strategies.map((strategy) => (
                                                    <CommandItem
                                                        value={strategy.name}
                                                        key={strategy.id}
                                                        onSelect={() => {
                                                            form.setValue("strategy", strategy.id);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                strategy.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0",
                                                            )}
                                                        />
                                                        {strategy.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
                    <Button
                        disabled={addMutation.isPending || updateMutation.isPending}
                        className="w-fit"
                    >
                        {(addMutation.isPending || updateMutation.isPending) && (
                            <Loader2
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        {mode === "add" ? "Ajouter un compte" : "Mettre à jour le compte"}
                        <span className="sr-only">
              {mode === "add" ? "Ajouter un compte" : "Mettre à jour le compte"}
            </span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
