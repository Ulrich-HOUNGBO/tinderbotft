import type { Metadata } from "next";
import { Outfit as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/lib/providers/auth-provider";
import QueryProvider from "@/lib/providers/query-provider";

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
				<AuthProvider>
					<QueryProvider>
						{/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
						{children}
						<TailwindIndicator />
						<Toaster />
						{/* </ThemeProvider> */}
					</QueryProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
