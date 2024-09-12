import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import SendSmsForm from "@/components/forms/send-sms-form";
import { routes } from "@/lib/routes";
import { Metadata } from "next";
import AddProxyForm from "@/components/forms/add-proxy-form";
import AddBotForm from "@/components/forms/add-bot-settings-form";

export const metadata: Metadata = {
    title: "Dashboard - Ajouter un compte",
    description: "Dashboard add account page",
};

export default function SendSmsPage() {
    return (
        <div className="space-y-5">
            <Breadcrumbs
                segments={[
                    { title: "Bot", href: routes.dashboard.credits.index },
                    { title: "Ajouter un compte", href: routes.dashboard.credits.add },
                ]}
            />
            <div className="w-full">
                <AddBotForm />
            </div>
        </div>
    );
}
