import { Breadcrumbs } from "@/components/pagers/breadcrumbs";
import SmsListSection from "@/components/sections/sms-list-section";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard - Proxies",
  description: "Dashboard proxies page",
};

export default function SmsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Breadcrumbs segments={[{ title: "Proxies" }]} />
        <Button asChild className="w-fit font-heading">
          <Link href={routes.dashboard.sms.send}>Ajouter un proxy</Link>
        </Button>
      </div>

      <Suspense>
        <SmsListSection />
      </Suspense>
    </div>
  );
}
