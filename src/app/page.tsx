"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Github, Twitter, Mail, Rss } from "lucide-react";
import { useTheme } from "next-themes";
import { usePostHog } from "posthog-js/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { setTheme } = useTheme();
  const posthog = usePostHog();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [sharePosition, setSharePosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [showNewDesign, setShowNewDesign] = useState(false);
  const selectionRef = useRef<HTMLDivElement>(null);

  // Feature flag check
  useEffect(() => {
    if (posthog) {
      posthog.isFeatureEnabled("new-homepage-design").then((enabled) => {
        setShowNewDesign(enabled || false);
      });
    }
  }, [posthog]);

  useEffect(() => {
    // Track pageview
    if (posthog) {
      posthog.capture("$pageview", {
        path: "/",
        title: "Home - elhaam.dev",
      });
    }

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedText(selection.toString());
        setSharePosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 40,
        });
        setShowSharePopup(true);
      } else {
        setShowSharePopup(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [posthog]);

  const handleShare = () => {
    if (selectedText && posthog) {
      // Track share event
      posthog.capture("text_shared", {
        content: selectedText.substring(0, 100),
        path: "/",
      });

      const url = window.location.href;
      const text = encodeURIComponent(`"${selectedText}" — elhaam.dev`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  const featuredPosts = [
    {
      slug: "thoughtful-architecture",
      category: "engineering",
      title: "Building Thoughtful Architecture",
      description: "How to design systems that stand the test of time while remaining adaptable to change.",
    },
    {
      slug: "engineering-culture",
      category: "personal",
      title: "Engineering Culture Matters",
      description: "Why the environment you create determines the quality of code you ship.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
            elhaam.dev
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/blog" className="hover:text-primary transition-colors">
                Writing
              </Link>
              <Link href="/categories" className="hover:text-primary transition-colors">
                Categories
              </Link>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" ref={selectionRef}>
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              The thoughtful engineering blog
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Exploring software architecture, engineering practices, and the craft of building
              thoughtful systems. Written by{" "}
              <a
                href="https://truedevs.tech"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elhaam Basheer Chaudhry
              </a>
              .
            </p>
            <div className="flex items-center gap-4">
              <Link href="/blog">
                <Button>
                  Read the blog
                </Button>
              </Link>
              <a href="https://github.com/itse4elhaam" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="border-t border-border">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
              Featured Writing
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {post.category}
                      </Badge>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription className="text-base">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Share Popup */}
      {showSharePopup && (
        <button
          className="fixed bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg z-50 cursor-pointer transition-all duration-200 hover:opacity-90"
          style={{ left: sharePosition.x - 30, top: sharePosition.y }}
          onClick={handleShare}
        >
          Share
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Elhaam Basheer Chaudhry. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                We do thoughtful engineering at{" "}
                <a href="https://truedevs.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  truedevs.tech
                </a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/rss.xml" className="text-muted-foreground hover:text-primary transition-colors">
                <Rss className="h-4 w-4" />
              </a>
              <a href="mailto:hello@elhaam.dev" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/itse4elhaam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
