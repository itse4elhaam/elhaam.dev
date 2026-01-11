import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // Find related posts by category or tags
  const related = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;
      if (post.category === currentPost.category) score += 2;
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += sharedTags.length;
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline">
                <Card className="h-full hover:border-foreground/20 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                   <Badge variant="outline" className="text-xs font-mono">{post.category}</Badge>
                   <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
