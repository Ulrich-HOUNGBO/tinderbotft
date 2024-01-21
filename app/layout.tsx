import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "MarkSafeTo",
	description: "Envoyer des SMS professionnels simplement, rapidement et avec plus de fiabilité",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head />
			<body className={inter.className}>
				<main>{children}</main>
			</body>
		</html>
	);
}
