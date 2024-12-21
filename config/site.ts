import {MainNavItem} from "@/types";

export const siteConfig = {
  name: "Auto Date Swiper by Diamond Factory",
  description: "Automatically swipe on Tinder for you and manage your strategy",
  url: "https://autodateswiper.com/",
  mainNav: [
    {
      title: "Acceuil",
      href: "/",
    },
    {
      title: "A propos",
      href: "/#about",
    },
    {
      title: "Fonctionnalités",
      href: "/#features",
    },
    {
      title: "Tarification",
      href: "/#pricing",
    },
  ] satisfies MainNavItem[],
};
