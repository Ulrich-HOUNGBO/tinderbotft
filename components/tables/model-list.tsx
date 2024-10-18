"use client";

import {Breadcrumbs} from "@/components/pagers/breadcrumbs";
import {useModels} from "@/services/models/hooks";
import {modelListColumns} from "@/components/tables/columns";
import {DataTable} from "@/components/ui/data-table";


export default function ModelList() {
    const {data: models = [], isLoading, isError} = useModels();
    console.log("models", models)
    return (
        <div className="space-y-5">
            <Breadcrumbs segments={[{title: "Models"}]}/>

            <div className="space-y-6">
                <DataTable columns={modelListColumns} data={models ?? []}/>
            </div>
        </div>
    );
}
