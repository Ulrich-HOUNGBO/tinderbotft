import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head />
			<body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
				{/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
				{children}
				<TailwindIndicator />
				<Toaster />
				{/* </ThemeProvider> */}
			</body>
		</html>
	);
}
