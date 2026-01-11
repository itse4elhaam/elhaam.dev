import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { getPreviousPost, getNextPost } from "@/lib/post-navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogContent from "./blog-content";
import { TextSelectionShare } from "@/components/text-selection-share";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { ScrollToTop } from "@/components/scroll-to-top";
import { RelatedPosts } from "@/components/related-posts";
import { PostNavigation } from "@/components/post-navigation";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => !post.tags.includes("coming-soon"))
    .map((post) => ({
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
    alternates: {
      canonical: `https://elhaam.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://elhaam.dev/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
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
      title: post.title,
      description: post.description,
      images: ["/dp.jpeg"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post || post.tags.includes("coming-soon")) {
    notFound();
  }

  const htmlContent = await markdownToHtml(post.content);
  const previousPost = getPreviousPost(post, posts);
  const nextPost = getNextPost(post, posts);

  return (
    <TextSelectionShare>
      <ReadingProgress showTimeEstimate={true} readingTime={post.readingTime} />
      <TableOfContents />
      <ScrollToTop />
      <div className="flex-1 w-full">
        <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 transition-[max-width] duration-300 ease-in-out">
          <Link href="#main-content" className="sr-only focus:not-sr-only focus:underline">
            Skip to content
          </Link>

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
            
            <p className="text-base text-muted-foreground">Written by Elhaam</p>
            
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

          {/* Related Posts */}
          <RelatedPosts currentPost={post} allPosts={posts} />

          <PostNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>

        <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="pt-8 border-t border-border">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              ← Read more posts
            </Link>
          </div>
        </footer>
      </div>
    </TextSelectionShare>
  );
}
