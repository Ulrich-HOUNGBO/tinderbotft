import {Metadata} from "next";
import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import ConnectInsta from "@/components/forms/connect-insta";
import {routes} from "@/lib/routes";

export const metadata: Metadata = {
    title: "Connect - Insta",
    description: "Connect insta page",
};

export default function InstaPage() {
    return (
        <div className="space-y-5">
            <Breadcrumbs
                segments={[
                    { title: "Insta", href: routes.dashboard.insta.index },
                    { title: "Add insta account", href: routes.dashboard.insta.connect },
                ]}
            />
            <div className="w-full">
                <ConnectInsta />
            </div>
        </div>
    );
}
