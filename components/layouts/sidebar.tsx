"use client";

import DesktopSidebar from "@/components/layouts/desktop-sidebar";
import { dashboardConfig } from "@/config/dashboard";
import { useMe } from "@/services/users/hooks";
import { useSession } from "next-auth/react";

export default function SideBar() {
  const { data: session } = useSession();
  const { data: user, isLoading, error } = useMe(!!session?.accessToken);

  if (isLoading) return <div>Loading...</div>;
  if (error || !user) return <div>Error loading user data</div>;

  const config = dashboardConfig({ super_user: user.is_superuser });

  return (
    <div>
      <DesktopSidebar sidebarNavItems={config.mainNav} />
    </div>
  );
}
