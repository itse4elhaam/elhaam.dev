import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface PostNavigationProps {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export function PostNavigation({ previousPost, nextPost }: PostNavigationProps) {
  if (!previousPost && !nextPost) return null;

  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
      {previousPost ? (
        <Link
          href={`/blog/${previousPost.slug}`}
          className={cn(
            "group flex flex-col gap-2 p-4 rounded-lg border border-border",
            "hover:bg-muted/40 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Previous</span>
          </div>
          <span className="font-semibold text-foreground group-hover:text-foreground transition-colors line-clamp-2">
            {previousPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className={cn(
            "group flex flex-col gap-2 p-4 rounded-lg border border-border text-right",
            "hover:bg-muted/40 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50"
          )}
        >
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
            <span>Next</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          <span className="font-semibold text-foreground group-hover:text-foreground transition-colors line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
