import { Metadata } from "next";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { routes } from "@/lib/routes";
import AddOrUpdateProxyForm from "@/components/forms/add-proxy-form";

export const metadata: Metadata = {
  title: "Dashboard - Ajouter un proxy",
  description: "Dashboard add proxy page",
};

export default function AddAccountPage() {
  return (
    <div className="space-y-5">
      <Breadcrumbs
        segments={[
          { title: "Proxy", href: routes.dashboard.proxy.index },
          { title: "Ajouter un proxy", href: routes.dashboard.proxy.add },
        ]}
      />
      <div className="w-full">
        <AddOrUpdateProxyForm mode={"add"} />
      </div>
    </div>
  );
}
