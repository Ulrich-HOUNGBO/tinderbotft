"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { botSchema } from "@/lib/validations/bot";
import { useAddBot } from "@/services/bot/hooks";
import { useProxies } from "@/services/proxy/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { routes } from "@/lib/routes";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"; // Import shadcn select components

type Credentials = z.infer<typeof botSchema>;

type Proxy = {
    id: string;
    name: string;
    host: string;
    username: string;
    password: string;
};

export default function AddBotForm() {
    const router = useRouter();
    const { mutateAsync, isPending } = useAddBot();
    const { data: proxies = [], isLoading, isError } = useProxies();

    const form = useForm<Credentials>({
        resolver: zodResolver(botSchema),
        defaultValues: {
            bot_name: "",
            token: "",
            proxy: "",
            swipe_times: 0,
            right_swipe_percentage: 0,
        },
        mode: "all",
    });

    const onSubmit = async (data: Credentials) => {
        await mutateAsync(data, {
            onSuccess: async () => {
                toast({
                    title: "Compte ajouté avec succès",
                });
                router.push(routes.dashboard.credits.index);
            },
            onError: (error: any) => {
                toast({
                    variant: "destructive",
                    title: "Une erreur s'est produite",
                    description: error.response.data,
                });
            },
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading proxies</div>;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                className="grid max-w-2xl gap-y-3 md:gap-y-7"
            >
                <div className="space-y-2 md:space-y-3">
                    <FormField
                        control={form.control}
                        name="bot_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du Bot</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du bot" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token</FormLabel>
                                <FormControl>
                                    <Input placeholder="Token du compte" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="proxy"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Proxy</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a proxy" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Proxies</SelectLabel>
                                                {proxies.map((proxy) => (
                                                    <SelectItem key={proxy.id} value={proxy.id}>
                                                        {proxy.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="swipe_times"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de Swipe</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Nombre de swipes"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="right_swipe_percentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pourcentage de like</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Pourcentage de like"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <Button disabled={isPending} className="w-fit">
                    {isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                    Ajouter Bot
                    <span className="sr-only">Ajouter Bot</span>
                </Button>
            </form>
        </Form>
    );
}
