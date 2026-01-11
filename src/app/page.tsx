import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 md:py-16">
      <PostList posts={posts} />
    </div>
  );
}
