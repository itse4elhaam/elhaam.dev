"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogContent from "./blog-content";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ScrollToTop } from "@/components/scroll-to-top";
import { RelatedPosts } from "@/components/related-posts";
import { PostNavigation } from "@/components/post-navigation";
import ToggleTheme from "@/components/toggle-theme";
import { useFullscreen } from "@/contexts/fullscreen-context";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  readingTime?: string;
}

interface BlogPageContentProps {
  post: BlogPost;
  htmlContent: string;
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
  allPosts: BlogPost[];
}

export function BlogPageContent({
  post,
  htmlContent,
  previousPost,
  nextPost,
  allPosts,
}: BlogPageContentProps) {
  const { isFullscreen } = useFullscreen();

  return (
    <>
      {!isFullscreen && <ToggleTheme />}
      {!isFullscreen && <ReadingProgress showTimeEstimate={true} readingTime={post.readingTime} />}
      {!isFullscreen && <TableOfContents />}
      {!isFullscreen && <ScrollToTop />}
      <div className="flex-1 w-full">
        <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 transition-[max-width] duration-300 ease-in-out">
          <Link
            href="#main-content"
            className="sr-only focus:not-sr-only focus:underline"
          >
            Skip to content
          </Link>

          {!isFullscreen && (
            <Link href="/" className="inline-block mb-8 no-underline">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground pl-0 -ml-2 hover:bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to list
              </Button>
            </Link>
          )}

          <header className="mb-10 space-y-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-mono text-muted-foreground">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span className="capitalize">{post.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              {post.title}
            </h1>

            <p className="text-base text-muted-foreground">
              Written by{" "}
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Elhaam
              </Link>
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="font-mono text-xs bg-muted/50 text-muted-foreground hover:bg-muted"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="font-serif">
            <BlogContent htmlContent={htmlContent} />
          </div>

          {!isFullscreen && <RelatedPosts currentPost={post} allPosts={allPosts} />}
          {!isFullscreen && <PostNavigation previousPost={previousPost} nextPost={nextPost} />}
        </article>

        {!isFullscreen && (
          <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12">
            <div className="pt-8 border-t border-border">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Read more posts
              </Link>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
