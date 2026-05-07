import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opend2c.in"),
  title: "OpenD2C — The marketplace for D2C brands",
  description:
    "OpenD2C is a free directory for direct-to-consumer brands in India. Get discovered by customers, retailers and partners.",
  openGraph: {
    title: "OpenD2C — The marketplace for D2C brands",
    description:
      "OpenD2C is a free directory for direct-to-consumer brands in India.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenD2C — The marketplace for D2C brands",
    description:
      "OpenD2C is a free directory for direct-to-consumer brands in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
