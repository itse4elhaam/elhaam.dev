"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = React.useState<TOCItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const items = elements.map((elem) => ({
      id: elem.id,
      text: elem.textContent || "",
      level: Number(elem.tagName.substring(1)),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 group toc-sidebar hidden xl:block">
      {/* Tab visible when closed */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-32 bg-background/80 backdrop-blur-md border-y border-r border-border rounded-r-xl flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:-translate-x-full shadow-sm">
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Content panel */}
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-r-xl p-6 w-64 shadow-xl transform -translate-x-[calc(100%-2rem)] hover:translate-x-0 transition-transform duration-300 ease-in-out">
        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
          Contents
        </h4>
        <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block text-sm py-1 transition-colors border-l-2 pl-3",
                heading.level === 3 && "ml-4",
                activeId === heading.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
