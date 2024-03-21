import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import QueryProvider from "@/lib/providers/query-provider";
import SessionProvider from "@/lib/providers/session-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

const fontHeading = localFont({
	src: "../assets/fonts/ClashDisplay-Medium.woff2",
	variable: "--font-heading",
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
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
			<body
				className={cn("bg-background font-heading antialiased min-h-screen", fontSans.variable, fontHeading.variable)}
			>
				<SessionProvider>
					<QueryProvider>
						{/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
						{children}
						<TailwindIndicator />
						<Toaster />
						{/* </ThemeProvider> */}
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
