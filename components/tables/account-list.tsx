"use client";

import { accountListColumns } from "@/components/tables/columns";
import { DataTable } from "@/components/ui/data-table";
import { useBotaccounts } from "@/services/bot-account/hooks";

export default function AccountList() {
  const { isLoading, isError, data } = useBotaccounts();

  return (
    <div className="space-y-3">
      <h1 className="font-heading">Liste des comptes</h1>
      <DataTable columns={accountListColumns} data={data ?? []} />
    </div>
  );
}
