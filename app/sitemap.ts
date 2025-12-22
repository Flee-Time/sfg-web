import { MetadataRoute } from "next";
import { getSortedPostsData, getAllTags } from "@/lib/posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://web.sfg.quest";

  try {
    const posts = getSortedPostsData();
    
    const postUrls = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const tags = getAllTags();
    
    const tagUrls = tags.map((tag) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/feeds`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
    ];

    return [...staticRoutes, ...postUrls, ...tagUrls];

  } catch (error) {
    console.error("Sitemap generation failed:", error);
    
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
    ];
  }
}