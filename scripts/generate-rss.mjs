import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Feed } from "feed";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content");
const siteUrl = "https://web.sfg.quest";

async function generateRss() {
  const feed = new Feed({
    title: "sfg-web | Lab Notebook",
    description:
      "Koray's public lab notes on embedded systems, Linux, and hardware.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/images/og-image.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Koray Bilir`,
    author: {
      name: "Koray Bilir",
      email: "koraybilir@sfg.quest",
      link: siteUrl,
    },
  });

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ""),
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail,
      content: content, // Keep raw content for now
    };
  });

  // Sort posts by date
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const recentPosts = posts.slice(0, 20);

  marked.use({ gfm: true, breaks: true });

  recentPosts.forEach((post) => {
    const url = `${siteUrl}/posts/${post.slug}`;

    let htmlContent = marked.parse(post.content);

    // patch image sources and link hrefs
    htmlContent = htmlContent
      .replace(/src="\/([^"]+)"/g, `src="${siteUrl}/$1"`)
      .replace(/src='\/([^']+)'/g, `src='${siteUrl}/$1'`)
      .replace(/href="\/([^"]+)"/g, `href="${siteUrl}/$1"`)
      .replace(/href='\/([^']+)'/g, `href='${siteUrl}/$1'`);

    let absoluteThumbnailUrl = null;

    if (post.thumbnail) {
      absoluteThumbnailUrl = `${siteUrl}${post.thumbnail}`;
    }

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: htmlContent,
      author: [{ name: "Koray Bilir", link: siteUrl }],
      date: new Date(post.date),
      image: absoluteThumbnailUrl,
    });
  });

  fs.writeFileSync(
    path.join(process.cwd(), "public", "rss.xml"), 
    feed.rss2()
  );
  fs.writeFileSync(
    path.join(process.cwd(), "public", "atom.xml"),
    feed.atom1()
  );
  fs.writeFileSync(
    path.join(process.cwd(), "public", "feed.json"),
    feed.json1()
  );

  console.log("RSS Feed generated successfully.");
}

generateRss();
