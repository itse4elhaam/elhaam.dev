"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { type BlogPost } from "@/lib/blog";

interface PostListProps {
  posts: BlogPost[];
}

export function PostList({ posts }: PostListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const lowerQuery = searchQuery.toLowerCase();
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery)
      );
    });
  }, [posts, searchQuery]);

  return (
    <div className="space-y-12">
      <div className="relative group">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full bg-transparent py-2 pl-8 text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:placeholder:text-muted-foreground/30 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search posts"
        />
      </div>

      <div className="space-y-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block space-y-3 p-4 -mx-4 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-muted/30 hover:translate-x-1">
                <div className="flex items-baseline gap-3">
                  <time className="text-xs font-mono text-muted-foreground shrink-0">
                    {post.date}
                  </time>
                  <h2 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-[calc(5rem+0.75rem)] md:pl-[calc(4ch+0.75rem)] hidden sm:block">
                  {post.description}
                </p>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            No posts found for "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}
