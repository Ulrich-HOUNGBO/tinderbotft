"use client";

import {useState} from "react";
import {accountListColumns} from "@/components/tables/columns";
import {DataTable} from "@/components/ui/data-table";
import {useBotaccounts} from "@/services/bot-account/hooks";
import {useModels} from "@/services/models/hooks";
import {Input} from "@/components/ui/input";

export default function AccountList() {
    const {data} = useBotaccounts();
    const {data: models = []} = useModels();
    const [accountFilter, setAccountFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");

    const handleAccountFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountFilter(e.target.value);
    };

    const handleModelFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModelFilter(e.target.value);
    };

    const filteredData = data?.filter((account) => {
        const model = models.find((model) => model.id === account.modele);
        const modelName = model ? model.name.toLowerCase() : "";
        return account.title.toLowerCase().includes(accountFilter.toLowerCase()) &&
            modelName.includes(modelFilter.toLowerCase());
    }) ?? [];

    return (
        <div className="space-y-3">
            <h1 className="font-heading">Accounts List</h1>
            <div className="flex w-1/3 space-x-3">
                <Input
                    type="text"
                    placeholder="Search account"
                    value={accountFilter}
                    onChange={handleAccountFilterChange}
                    className="input"
                />
                <Input
                    type="text"
                    placeholder="Search model"
                    value={modelFilter}
                    onChange={handleModelFilterChange}
                    className="input"
                />
            </div>
            <DataTable columns={accountListColumns} data={filteredData}/>
        </div>
    );
}