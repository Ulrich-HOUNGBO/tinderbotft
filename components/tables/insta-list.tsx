"use client";

import {instaListColumns} from "@/components/tables/columns";
import {DataTable} from "@/components/ui/data-table";
import {useInstaAccount} from "@/services/instagram/hooks";


export default function InstaList() {
    const {data: instaAccount = [], isError} = useInstaAccount();
    return (
        <div className="space-y-5">
            <h1 className="font-heading">Insta Account list</h1>

            <div className="space-y-6">
                <DataTable columns={instaListColumns} data={instaAccount ?? []}/>
            </div>
        </div>
    );
}
