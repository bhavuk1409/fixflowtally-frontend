import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/lib/queryClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Fixflow – AI Business OS for Tally SMEs",
    template: "%s | Fixflow",
  },
  description:
    "Real-time P&L, cashflow, receivables and an AI CFO for your Tally-powered business.",
  metadataBase: new URL("https://fixflow.app"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo-white.svg",
  },
  openGraph: {
    title: "Fixflow – AI Business OS for Tally SMEs",
    description: "Real-time financial intelligence powered by your Tally data.",
    type: "website",
    images: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={inter.variable}>
        <body className="font-sans">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ReactQueryProvider>
              {children}
              <Toaster richColors position="top-right" />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
