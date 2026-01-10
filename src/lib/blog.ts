import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  readingTime?: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const categories = fs.readdirSync(postsDirectory).filter((category) => {
    return fs.statSync(path.join(postsDirectory, category)).isDirectory();
  });
  
  const allPosts: BlogPost[] = [];
  
  for (const category of categories) {
    const categoryPath = path.join(postsDirectory, category);
    const files = fs.readdirSync(categoryPath);
    
    const posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const fullPath = path.join(categoryPath, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        
        return {
          slug: file.replace(".md", ""),
          title: data.title,
          description: data.description || "",
          date: data.date,
          category,
          tags: data.tags || [],
          content,
          readingTime: calculateReadingTime(content),
        };
      });
    
    allPosts.push(...posts);
  }
  
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes === 1 ? "1 min read" : `${minutes} min read`;
}
