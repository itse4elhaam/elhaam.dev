import type { Metadata } from "next";
import { Geist, Merriweather, Caveat } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogClientProvider } from "@/components/posthog-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMonoNerdMono = localFont({
  src: [
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/JetBrainsMonoNerdFontMono-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains-mono-nerd",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
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
  alternates: {
    canonical: "https://elhaam.dev",
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
        className={`${geistSans.variable} ${jetbrainsMonoNerdMono.variable} ${merriweather.variable} ${caveat.variable} min-h-screen flex flex-col antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogClientProvider>
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
