"use client";

import { strategyListColumns } from "@/components/tables/columns";
import { useStrategies } from "@/services/strategy/hooks";
import { DataTable } from "@/components/ui/data-table";

export default function StrategyList() {
  const { data: strategies = [], isLoading, isError } = useStrategies();
  return (
    <div className="space-y-3">
      <h1 className="font-heading">Liste des stratégies</h1>
      <DataTable columns={strategyListColumns} data={strategies ?? []} />
    </div>
  );
}
