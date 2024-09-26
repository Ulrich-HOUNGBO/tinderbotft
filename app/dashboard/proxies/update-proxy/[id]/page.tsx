"use client";

import { useParams } from "next/navigation";
import { routes } from "@/lib/routes";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { useProxy } from "@/services/proxy/hooks";
import AddOrUpdateProxyForm from "@/components/forms/add-proxy-form";

export default function UpdateProxyPage() {
  const { id } = useParams();
  const proxyId = Array.isArray(id) ? id[0] : id;
  const { data: proxy, isLoading } = useProxy(proxyId as string);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-5">
      <Breadcrumbs
        segments={[
          { title: "Compte", href: routes.dashboard.proxy.index },
          {
            title: `Mise à jour du proxy - ${proxy?.name}`,
            href: routes.dashboard.proxy.update(proxyId),
          },
        ]}
      />
      <div className="space-y-6">
        {proxy && <AddOrUpdateProxyForm mode="update" initialData={proxy} />}
      </div>
    </div>
  );
}
