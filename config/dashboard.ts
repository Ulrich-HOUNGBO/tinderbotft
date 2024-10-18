import {routes} from "@/lib/routes";
import {MainNavItem} from "@/types";
import {Cable, LayoutGrid, NotebookTabs, UserRound, Waypoints} from "lucide-react";

export const dashboardConfig = {
    mainNav: [
        {
            title: "Dashboard",
            href: routes.dashboard.home,
            icon: LayoutGrid,
        },
        {
            title: "Account",
            href: routes.dashboard.account.index,
            icon: NotebookTabs,
        },
        {
            title: "Models",
            href: routes.dashboard.model.index,
            icon: UserRound,
        },
        {
            title: "Strategy",
            href: routes.dashboard.strategy.index,
            icon: Cable,
        },
        {
            title: "Proxies",
            href: routes.dashboard.proxy.index,
            icon: Waypoints,
        }
    ] satisfies MainNavItem[],
};
