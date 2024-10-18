"use client";

import {useParams} from "next/navigation";
import {routes} from "@/lib/routes";
import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import {useModel} from "@/services/models/hooks";
import AddOrUpdateModelForm from "@/components/forms/add-model-form";

export default function UpdateModelPage() {
    const {id} = useParams();
    const modelId = Array.isArray(id) ? id[0] : id;
    const {data: model, isLoading} = useModel(modelId as string);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-5">
            <Breadcrumbs
                segments={[
                    {title: "Model", href: routes.dashboard.model.index},
                    {
                        title: "Model Update",
                        href: routes.dashboard.model.update(modelId),
                    },
                ]}
            />
            <div className="space-y-6">
                {model && (
                    <AddOrUpdateModelForm mode="update" initialData={model}/>
                )}
            </div>
        </div>
    );
}
