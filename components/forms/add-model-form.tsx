"use client"

import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {modelSchema} from '@/lib/validations/model';
import {useAddModel, useUpdateModel} from '@/services/models/hooks';
import {toast} from '@/components/ui/use-toast';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {createModelCredentials} from "@/services/models/queries";
import {ModelInterface} from "@/types";
import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";

type ModelFormValues = z.infer<typeof modelSchema>;

interface AddOrUpdateModelFormProps {
    mode: "add" | "update";
    initialData?: ModelInterface;
}

export default function AddOrUpdateModelForm({mode, initialData}: Readonly<AddOrUpdateModelFormProps>) {
    const router = useRouter();
    const addMutation = useAddModel();
    const updateMutation = useUpdateModel(initialData?.id ?? "");

    const form = useForm<ModelFormValues>({
        resolver: zodResolver(modelSchema),
        defaultValues: {
            name: initialData?.name ?? '',
            description: initialData?.description ?? '',
        },
        mode: 'all',
    });

    const onSubmit = async (data: ModelFormValues) => {
        if (mode === "add") {
            await addMutation.mutateAsync(data as createModelCredentials, {
                onSuccess: () => {
                    toast({title: 'Model added successfully'});
                    router.push(routes.dashboard.model.index);
                },
                onError: (error: any) => {
                    toast({variant: 'destructive', title: 'An error occurred', description: error.response.data.error});
                },
            });
        } else {
            await updateMutation.mutateAsync(data as createModelCredentials, {
                onSuccess: () => {
                    toast({title: 'Model updated successfully'});
                    router.push(routes.dashboard.model.index);
                },
                onError: (error: any) => {
                    toast({variant: 'destructive', title: 'An error occurred', description: error.response.data.error});
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid max-w-2xl gap-4 md:gap-7">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Model Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Model Name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description" {...field} value={field.value ?? ""}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={addMutation.isPending || updateMutation.isPending}>
                    {(addMutation.isPending || updateMutation.isPending) ? 'Processing...' : (mode === "add" ? 'Add Model' : 'Update Model')}
                </Button>
            </form>
        </Form>
    );
}