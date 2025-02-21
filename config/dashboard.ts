import {routes} from "@/lib/routes";
import {MainNavItem} from "@/types";
import {Cable, Instagram, LayoutGrid, NotebookTabs, UserRound, Waypoints,} from "lucide-react";

// Function to generate the dashboard configuration based on user info
export const dashboardConfig = (user: { super_user: boolean }) => ({
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
    },
    // Conditionally include the Admin panel
    ...(user.super_user
      ? [
          {
            title: "Insta",
            href: routes.dashboard.insta.index,
            icon: Instagram,
          },
          {
            title: "Admin",
            href: routes.dashboard.admin.index,
            icon: LayoutGrid,
          },
        ]
      : []),

  ] satisfies MainNavItem[],
});
