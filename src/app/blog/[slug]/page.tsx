import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogContent from "./blog-content";
import { TextSelectionShare } from "@/components/text-selection-share";

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

  return (
    <TextSelectionShare>
      <main className="flex-1">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Back Button */}
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

          {/* Post Header */}
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
            
            {/* Tags */}
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

          {/* Post Content */}
          <div className="font-serif">
             <BlogContent htmlContent={htmlContent} />
          </div>

          {/* Post Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
             <div className="flex justify-between items-center">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  ← Read more posts
                </Link>
             </div>
          </footer>
        </article>
      </main>
    </TextSelectionShare>
  );
}
