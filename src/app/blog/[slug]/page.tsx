import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { getPreviousPost, getNextPost } from "@/lib/post-navigation";
import { TextSelectionShare } from "@/components/text-selection-share";
import { FullscreenProvider } from "@/contexts/fullscreen-context";
import { BlogPageContent } from "./blog-page-content";

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

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
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
    <FullscreenProvider>
      <TextSelectionShare>
        <BlogPageContent
          post={post}
          htmlContent={htmlContent}
          previousPost={previousPost}
          nextPost={nextPost}
          allPosts={posts}
        />
      </TextSelectionShare>
    </FullscreenProvider>
  );
}
