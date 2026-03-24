import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { SectorProvider } from "@/components/SectorProvider";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "My 5 Star Report | Hospice & Home Health M&A Intelligence",
  description: "Track CMS 5-Star ratings, quality measures, and M&A intelligence for hospice and home health providers.",
  keywords: ["CMS", "5-star", "quality rating", "hospice", "home health", "healthcare", "M&A", "acquisition", "CAHPS"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "My 5 Star Report",
  },
  openGraph: {
    title: "My 5 Star Report",
    description: "CMS 5-Star Quality Rating Intelligence Platform",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14b8a6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Syne:wght@400..800&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <AuthProvider>
          <ThemeProvider>
            <SectorProvider>
              <AppShell>{children}</AppShell>
            </SectorProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
