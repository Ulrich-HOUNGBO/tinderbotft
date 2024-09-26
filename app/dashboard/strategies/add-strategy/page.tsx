import { Metadata } from "next";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { routes } from "@/lib/routes";
import AddStrategyForm from "@/components/forms/add-strategy-form";

export const metadata: Metadata = {
  title: "Dashboard - Ajouter une strategie",
  description: "Dashboard add strategy page",
};

export default function AddStrategyPage() {
  return (
    <div className="space-y-5">
      <Breadcrumbs
        segments={[
          { title: "Strategie", href: routes.dashboard.strategy.index },
          {
            title: "Ajouter une strategie",
            href: routes.dashboard.strategy.add,
          },
        ]}
      />
      <div className="w-full">
        <AddStrategyForm mode="add" />
      </div>
    </div>
  );
}
