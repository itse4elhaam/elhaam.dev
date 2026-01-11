import type { Metadata } from "next";
import { Geist, Merriweather, Caveat, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogClientProvider } from "@/components/posthog-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { KeyboardNav } from "@/components/keyboard-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: {
    default: "elhaam.dev | The Thoughtful Engineering Blog",
    template: "%s | elhaam.dev",
  },
  icons: {
    icon: "/dp.jpeg",
    apple: "/dp.jpeg",
  },
  alternates: {
    canonical: "https://elhaam.dev",
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
  description:
    "A thoughtful engineering blog by Elhaam Basheer Chaudhry. Writing about software engineering, architecture, and thoughtful code.",
  keywords: [
    "software engineering",
    "architecture",
    "programming",
    "blog",
    "thoughtful engineering",
    "TrueDevs",
    "Next.js",
  ],
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
        url: "/dp.jpeg",
        width: 1000,
        height: 1000,
        alt: "Elhaam Basheer Chaudhry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "elhaam.dev | The Thoughtful Engineering Blog",
    description: "A thoughtful engineering blog by Elhaam Basheer Chaudhry",
    images: ["/dp.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://elhaam.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} ${merriweather.variable} ${caveat.variable} min-h-screen flex flex-col antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogClientProvider>
            <KeyboardNav />
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </PostHogClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
