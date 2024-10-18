import {Metadata} from "next";
import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import ModelList from "@/components/tables/model-list";
import Link from "next/link";
import {routes} from "@/lib/routes";
import {Button} from "@/components/ui/button";


export const metadata: Metadata = {
    title: "Dashboard - Model",
    description: "Dashboard models page",
};

export default function ModelsPage() {
    return (
        <div className="space-y-5">
            <Breadcrumbs segments={[{title: "Models"}]}/>
            <Button asChild className="w-fit font-heading">
                <Link href={routes.dashboard.model.add}>Add new model</Link>
            </Button>
            <div className="space-y-6">
                <ModelList/>
            </div>
        </div>
    );
}
