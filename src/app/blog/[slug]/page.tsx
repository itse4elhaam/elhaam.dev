import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { isFeatureEnabled } from "@/lib/posthog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import from "./blog BlogContent-content";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);

  // Server-side feature flag check
  const showAuthorCTA = await isFeatureEnabled("author-cta", "anonymous");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
            elhaam.dev
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to writing
            </Button>
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <Link href={`/categories/${post.category}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {post.category}
                </Badge>
              </Link>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Post Content */}
          <BlogContent htmlContent={htmlContent} />

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <Badge variant="outline" className="hover:bg-accent">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Author Section with Feature Flag */}
            <div className="rounded-xl border bg-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold shrink-0">
                  EB
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Elhaam Basheer Chaudhry
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Software engineer passionate about thoughtful architecture and engineering culture.
                    Building meaningful systems at truedevs.tech.
                  </p>
                  <a
                    href="https://truedevs.tech"
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    We do thoughtful engineering at truedevs.tech →
                  </a>
                  {showAuthorCTA && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" asChild>
                        <a href="mailto:hello@elhaam.dev">Work with me →</a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Elhaam Basheer Chaudhry. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 text-center md:text-right">
              We do thoughtful engineering at{" "}
              <a href="https://truedevs.tech" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                truedevs.tech
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
