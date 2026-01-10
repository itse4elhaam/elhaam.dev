import Link from "next/link";
import { Github, Mail, Twitter, Rss } from "lucide-react";
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
          <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  The thoughtful engineering blog
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Exploring software architecture, engineering practices, and the craft of building
                  thoughtful systems. Written by{" "}
                  <a
                    href="https://truedevs.tech"
                    className="text-primary hover:text-accent transition-colors underline decoration-primary/30 hover:decoration-accent underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Elhaam Basheer Chaudhry
                  </a>
                  .
                </p>
                <div className="flex items-center gap-4">
                  <Link href="/blog">
                    <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                      Read the blog
                    </Button>
                  </Link>
                  <a href="https://github.com/itse4elhaam" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="hover:bg-muted">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border bg-background">
            <div className="max-w-4xl mx-auto px-6 py-20">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10">
                Featured Writing
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <Card className="h-full transition-all duration-200 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30 cursor-pointer">
                      <CardHeader className="space-y-4">
                        <Badge variant="secondary" className="w-fit">
                          {post.category}
                        </Badge>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
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

        <section className="border-t border-border bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                We do thoughtful engineering
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                At <a href="https://truedevs.tech" className="text-primary hover:text-accent font-semibold transition-colors" target="_blank" rel="noopener noreferrer">truedevs.tech</a>, we believe in building software that stands the test of time. 
                Systems designed with intention, code written with care, and solutions crafted through deep understanding.
              </p>
              <a href="https://truedevs.tech" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="default" className="shadow-lg shadow-primary/20">
                  Work with us
                </Button>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="space-y-8">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="text-base leading-relaxed">
                  <strong className="text-foreground">Elhaam Basheer Chaudhry</strong> is a software engineer who believes in the power of thoughtful design and deliberate architecture. 
                  This blog explores the intersection of technical excellence and pragmatic engineering—sharing lessons learned from building systems that matter.
                </p>
                <p className="text-sm mt-4">
                  When not writing code or blog posts, Elhaam works on building great products at{" "}
                  <a href="https://truedevs.tech" className="text-primary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                    truedevs.tech
                  </a>
                  .
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Elhaam Basheer Chaudhry. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="/rss.xml" className="text-muted-foreground hover:text-primary transition-colors" aria-label="RSS Feed">
                    <Rss className="h-4 w-4" />
                  </a>
                  <a href="mailto:hello@elhaam.dev" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </a>
                  <a href="https://twitter.com/itse4elhaam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="https://github.com/itse4elhaam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </HomeClient>
  );
}
