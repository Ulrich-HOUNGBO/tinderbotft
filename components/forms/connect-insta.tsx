"use client";

import React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useConnectMultipleAccount} from "@/services/instagram/hooks";

export default function ConnectInsta() {
    const router = useRouter();
    const form = useForm({
      defaultValues: {
        data: "",
      },
      mode: "all",
    });

    const { mutateAsync: connectMultipleAccount } = useConnectMultipleAccount();

    const onSubmit = async (data: { data: string }) => {
      try {
        await connectMultipleAccount(data);
        toast({
          title: "Data submitted successfully",
        });
        // router.push(routes.dashboard.home);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error submitting data",
          description: (error as any).message,
        });
      }
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
          <Button type="submit" className="w-fit bg-green-500 hover:bg-green-600">
            Submit
          </Button>
        </form>
      </FormProvider>
    );
  }