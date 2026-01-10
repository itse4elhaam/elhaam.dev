import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import highlight from "rehype-highlight";
import slug from "rehype-slug";
import autolinkHeadings from "rehype-autolink-headings";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm)
    .use(highlight)
    .use(slug)
    .use(autolinkHeadings, {
      behavior: "wrap",
      properties: { className: ["anchor"] },
    })
    .use(html)
    .process(markdown);
  
  return result.toString();
}
