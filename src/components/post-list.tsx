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
    let postsToFilter = posts;
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      postsToFilter = posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(lowerQuery) ||
          post.description.toLowerCase().includes(lowerQuery) ||
          post.content.toLowerCase().includes(lowerQuery)
        );
      });
    }

    return postsToFilter.sort((a, b) => {
      const aIsComingSoon = a.tags.includes("coming-soon");
      const bIsComingSoon = b.tags.includes("coming-soon");
      
      if (aIsComingSoon && !bIsComingSoon) return 1;
      if (!aIsComingSoon && bIsComingSoon) return -1;
      
      return 0;
    });
  }, [posts, searchQuery]);

  return (
    <div className="space-y-12">
      <div className="relative group">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent py-2 pl-8 text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:placeholder:text-muted-foreground/30 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search posts"
        />
      </div>

      <div className="space-y-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isComingSoon = post.tags.includes("coming-soon");
            
            return (
              <article key={post.slug} className="group">
                {isComingSoon ? (
                  <div className="block space-y-2 p-4 -mx-4 rounded-xl opacity-60 cursor-not-allowed">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <time className="text-sm font-mono text-muted-foreground/80">
                          {post.date} {post.readingTime && `• ${post.readingTime}`}
                        </time>
                        <span className="text-xs font-medium px-2 py-0.5 bg-muted/50 text-muted-foreground rounded-md border border-border">
                          Coming Soon
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-muted-foreground">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground/60">Written by Elhaam</p>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground/70 leading-relaxed max-w-2xl">
                      {post.description}
                    </p>
                  </div>
                ) : (
                  <Link 
                    href={`/blog/${post.slug}`} 
                    prefetch={true}
                    className="block space-y-2 p-4 -mx-4 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-muted/40"
                  >
                    <div className="flex flex-col gap-1">
                      <time className="text-sm font-mono text-muted-foreground/80">
                        {post.date} {post.readingTime && `• ${post.readingTime}`}
                      </time>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground/70">Written by Elhaam</p>
                    </div>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      {post.description}
                    </p>
                  </Link>
                )}
              </article>
            );
          })
        ) : (
          <p className="text-muted-foreground py-8 text-center">
            No posts found for "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}
