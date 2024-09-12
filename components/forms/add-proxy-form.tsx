"use client";

import { useRouter } from "next/navigation";
import { useAddProxy } from "@/services/proxy/hooks";
import { proxySchema } from "@/lib/validations/proxy";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { routes } from "@/lib/routes";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Credentials = z.infer<typeof proxySchema>;

export default function AddProxyForm() {
    const router = useRouter();
    const { mutateAsync, isPending } = useAddProxy();

    const form = useForm<Credentials>({
        resolver: zodResolver(proxySchema),
        defaultValues: {
            name: "",
            host: "",
            username: "",
            password: "",
        },
        mode: "all",
    });

    const onSubmit = async (data: Credentials) => {
        await mutateAsync(data, {
            onSuccess: async () => {
                 toast({
                    title: "Proxy ajouté avec succès",
                });
                router.push(routes.dashboard.sms.index);
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

    return (
        <Form {...form}>
            <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                className="grid max-w-2xl gap-y-3 md:gap-y-7"
            >
                <div className="space-y-2 md:space-y-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom du proxy" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="host"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hôte</FormLabel>
                                <FormControl>
                                    <Input placeholder="Adresse de l'hôte" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom utilisation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nom d'utilisateur" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Mot de passe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={isPending} className="w-fit">
                    {isPending && <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                    Ajouter Proxy
                    <span className="sr-only">Ajouter Proxy</span>
                </Button>
            </form>
        </Form>
    );
}
