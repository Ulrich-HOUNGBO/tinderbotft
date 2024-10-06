"use client";

import { useParams } from "next/navigation";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import { routes } from "@/lib/routes";
import { useStrategy } from "@/services/strategy/hooks";
import ConfigStrategyForm from "@/components/forms/config-strategy-form";
import {useBotsByStrategy} from "@/services/bot/hooks";

export default function ConfigStrategyPage() {
  const { id } = useParams();
  const strategyId = Array.isArray(id) ? id[0] : id;
  const { data: strategy } = useStrategy(strategyId as string);
  const { data: strategy_bots } = useBotsByStrategy(strategyId as string);

  return (
    <div className="space-y-5">
      <Breadcrumbs
        segments={[
          { title: "Stratégie", href: routes.dashboard.strategy.index },
          {
            title: `Configuration - ${strategy?.name}`,
            href: routes.dashboard.strategy.config(strategyId),
          },
        ]}
      />
      <div className="space-y-6">
        {strategy && (
          <ConfigStrategyForm
            daysNumber={strategy.days_number}
            strategyId={strategy.id}
            strategyBots={strategy_bots}
          />
        )}
      </div>
    </div>
  );
}
