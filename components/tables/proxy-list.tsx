"use client";

import { proxyListColumns } from "@/components/tables/columns";

import { DataTable } from "@/components/ui/data-table";
import { useProxies } from "@/services/proxy/hooks";

export default function ProxyList() {
  const { data: proxies = [], isLoading, isError } = useProxies();
  return (
    <div className="space-y-3">
      <h1 className="font-heading">Liste des proxies</h1>
      <DataTable columns={proxyListColumns} data={proxies ?? []} />
    </div>
  );
}
