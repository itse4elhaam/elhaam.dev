import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="w-full max-w-[var(--site-width)] mx-auto px-4 sm:px-6 py-12 md:py-16 transition-[max-width] duration-300 ease-in-out">
      <PostList posts={posts} />
    </div>
  );
}
