import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { HomeClient } from "@/components/home-client";

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

export default function Home() {
  return (
    <HomeClient>
      <div className="min-h-screen flex flex-col">
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
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">
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

          <section className="border-t border-border">
            <div className="max-w-4xl mx-auto px-6 py-16">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
                Featured Writing
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="h-full card-hover cursor-pointer">
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
            </div>
          </div>
        </footer>
      </div>
    </HomeClient>
  );
}
