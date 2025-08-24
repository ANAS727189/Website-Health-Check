import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Monitor - Website Health Checker",
  description: "Track your websites across the digital dunes with our comprehensive health monitoring tool. Check uptime, SSL certificates, response times, and more with a vintage desert theme.",
  keywords: ["website health checker", "uptime monitor", "SSL checker", "response time", "batch website check"],
  authors: [{ name: "Health Monitor Team" }],
  openGraph: {
    title: "🏜️ Health Monitor",
    description: "Track your websites across the digital dunes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏜️</text></svg>" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
