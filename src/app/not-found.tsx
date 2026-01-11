import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

export default function NotFound() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 flex flex-col items-center text-center">
      <h1 className="font-cursive text-8xl text-primary/20 mb-4">404</h1>
      <h2 className="text-3xl font-bold tracking-tight mb-4">Page not found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      
      <Link href="/">
        <Button size="lg" className="mb-16">
          Return Home
        </Button>
      </Link>

      <div className="w-full text-left border-t pt-12">
        <h3 className="text-2xl font-bold mb-8 text-center">Latest from the blog</h3>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
