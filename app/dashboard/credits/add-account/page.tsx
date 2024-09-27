import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { routes } from "@/lib/routes";
import { Metadata } from "next";
import AddOrUpdateAccountForm from "@/components/forms/add-account-form";

export const metadata: Metadata = {
  title: "Dashboard - Ajouter un compte",
  description: "Dashboard add account page",
};

export default function SendSmsPage() {
  return (
    <div className="space-y-5">
      <Breadcrumbs
        segments={[
          { title: "Compte", href: routes.dashboard.credits.index },
          { title: "Ajouter un compte", href: routes.dashboard.account.add },
        ]}
      />
      <div className="w-full">
        <AddOrUpdateAccountForm mode={"add"} />
      </div>
    </div>
  );
}
