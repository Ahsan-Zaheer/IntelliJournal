import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntelliJournal | Ai Powered Application",
  description: "IntelliJournal is an Ai powered journaling application that helps you write better and more consistently.",
  icons: {
    icon: '/favicon.png', // Standard favicon
    apple: '/favicon.png', // Apple icon (if needed)
    other: [
      { rel: 'icon', url: '/favicon.png' },
      { rel: 'shortcut icon', url: '/favicon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
