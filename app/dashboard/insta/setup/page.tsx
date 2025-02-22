import {Metadata} from "next";
import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Setup - Insta",
    description: "Setup insta page",
};

export default function SetupPage() {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Breadcrumbs segments={[{title: "Setup"}]}/>
            </div>

            <Suspense>
                <p>setup  page</p>
            </Suspense>
        </div>
    );
}
