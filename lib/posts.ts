import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), "content");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        date: string;
        title: string;
        description: string;
        tags: string[];
        thumbnail?: string;
      }),
    };
  });

  // Sort posts by date (latest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: {dark: "vitesse-dark", light: "vitesse-light"},
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; tags: string[]; thumbnail?: string; description: string }),
  };
}

export function getAllTags() {
  const posts = getSortedPostsData();
  const allTags = new Set<string>();

  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => allTags.add(tag.toLowerCase()));
    }
  });

  return Array.from(allTags);
}

export function getPostsByTag(tag: string) {
  const posts = getSortedPostsData();
  return posts.filter((post) =>
    post.tags?.map((t: string) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}
