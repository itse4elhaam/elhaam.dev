import { getAllPosts } from "@/lib/blog";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 md:py-16">
      <section className="mb-16 space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Hi. I&apos;m Elhaam. I build scalable systems at{" "}
          <a
            href="https://truedevs.tech"
            className="text-foreground underline decoration-border hover:decoration-primary underline-offset-4 transition-colors"
          >
            TrueDevs
          </a>
          . This is where I write about engineering, architecture, and the
          software craft.
        </p>
      </section>

      <PostList posts={posts} />
    </main>
  );
}
