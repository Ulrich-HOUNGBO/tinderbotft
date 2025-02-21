import {Metadata} from "next";
import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Connect - Insta",
    description: "Connect insta page",
};

export default function InstaPage() {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <Breadcrumbs segments={[{title: "Insta"}]}/>
            </div>

            <Suspense>
                <p>connect  page</p>
            </Suspense>
        </div>
    );
}
