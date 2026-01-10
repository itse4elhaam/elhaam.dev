import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import "./app.css";

export const metadata: Metadata = {
  title: {
    default: "elhaam.dev | The Thoughtful Engineering Blog",
    template: "%s | elhaam.dev",
  },
  description: "A thoughtful engineering blog by Elhaam Basheer Chaudhry. Writing about software engineering, architecture, and thoughtful code.",
  keywords: ["software engineering", "architecture", "programming", "blog", "thoughtful engineering"],
  authors: [{ name: "Elhaam Basheer Chaudhry" }],
  creator: "Elhaam Basheer Chaudhry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elhaam.dev",
    siteName: "elhaam.dev",
    title: "elhaam.dev | The Thoughtful Engineering Blog",
    description: "A thoughtful engineering blog by Elhaam Basheer Chaudhry",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "elhaam.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "elhaam.dev | The Thoughtful Engineering Blog",
    description: "A thoughtful engineering blog by Elhaam Basheer Chaudhry",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
