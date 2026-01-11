import { BlogPost } from "@/lib/blog";

interface NavigationLink {
  post: BlogPost;
  direction: "previous" | "next";
}

function getAdjacentPost(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  direction: "previous" | "next"
): BlogPost | null {
  const sortedPosts = [...allPosts]
    .filter((post) => !post.tags.includes("coming-soon") && !post.tags.includes("test"))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = sortedPosts.findIndex((post) => post.slug === currentPost.slug);
  
  if (currentIndex === -1) return null;

  const adjacentIndex = direction === "next" ? currentIndex - 1 : currentIndex + 1;
  
  if (adjacentIndex < 0 || adjacentIndex >= sortedPosts.length) return null;

  return sortedPosts[adjacentIndex];
}

export function getPreviousPost(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost | null {
  return getAdjacentPost(currentPost, allPosts, "previous");
}

export function getNextPost(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost | null {
  return getAdjacentPost(currentPost, allPosts, "next");
}
