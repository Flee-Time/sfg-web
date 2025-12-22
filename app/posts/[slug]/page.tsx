import ArticleView from "@/components/ArticleView";
import { getPostData, getSortedPostsData } from "@/lib/posts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export const dynamicParams = false; 

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const postsDirectory = path.join(process.cwd(), "content");
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return {
      title: "Post Not Found",
    };
  }

  try {
    const postData = await getPostData(slug);
    return {
      title: `${postData.title} | sfg-web`,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        type: "article",
        publishedTime: postData.date,
        images: postData.thumbnail ? [postData.thumbnail] : [],
      },
    };
  } catch {
    return { title: "Error" };
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const postsDirectory = path.join(process.cwd(), "content");
  
  if (!fs.existsSync(path.join(postsDirectory, `${slug}.md`))) {
    notFound();
  }

  const postData = await getPostData(slug);

  return <ArticleView postData={postData} />;
}