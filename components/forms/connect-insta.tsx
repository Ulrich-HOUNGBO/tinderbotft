"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useConnectMultipleAccount} from "@/services/instagram/hooks";
import {Loader2} from "lucide-react";
import {routes} from "@/lib/routes";

export default function ConnectInsta() {
    const router = useRouter();
    const form = useForm<any>({
        defaultValues: {
            data: "",
        },
        mode: "all",
    });

    const addMutation = useConnectMultipleAccount()


    const onSubmit = async (data: { data: string }) => {

        await addMutation.mutateAsync(
            data as any,
            {
                onSuccess: async () => {
                    toast({
                        title: "Compte(s) àjouté(s) avec succès",
                    });
                    router.push(routes.dashboard.insta.index);
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
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
                <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Insta Login Data</FormLabel>
                            <Textarea placeholder="Enter login data, one per line" {...field} className="h-32" />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
                    <Button
                        disabled={addMutation.isPending}
                        className="w-fit"
                    >
                        {(addMutation.isPending) && (
                            <Loader2
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Connect Account
                        <span className="sr-only">
                            {addMutation.isPending
                                ? "Submitting..."
                                : "Submit"}
                        </span>
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
