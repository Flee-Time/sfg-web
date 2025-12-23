import { getPostsByTag, getAllTags } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false; 

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) return notFound();

  return (
    <main className="max-w-none mx-auto p-4 font-sans">
      <header className="mb-8">
        <Link
          href="/"
          className="text-sm text-blue-600 font-bold hover:text-blue-400 transition-all block mb-4 mt-1"
        >
          ← All entries
        </Link>
        <h1 className="text-3xl font-bold capitalize mb-2 border-b border-border-subtle pb-2 text-foreground">
          Tag: <span className="text-blue-500">#{tag}</span>
        </h1>
        <p className="text-muted">{posts.length} entries found</p>
      </header>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="group relative flex flex-col md:flex-row items-center gap-6 border-b border-border-subtle pb-8 last:border-0"
          >
            {post.thumbnail && (
              <div className="w-full md:w-48 h-32 shrink-0 overflow-hidden rounded-lg border border-border-subtle bg-surface relative">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2 relative z-10">
                <span className="text-xs font-mono text-muted shrink-0 mr-1">
                  {post.date}
                </span>

                {post.tags?.map((t: string) => (
                  <Link
                    key={t}
                    href={`/tags/${t.toLowerCase()}`}
                    className={`
                      text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded transition-colors font-mono whitespace-nowrap
                      ${
                        t.toLowerCase() === tag.toLowerCase()
                          ? "border-blue-500 text-blue-500 bg-blue-500/10" // Highlight current tag
                          : "border-border-subtle text-muted hover:border-blue-400 hover:text-blue-400"
                      }
                    `}
                  >
                    #{t}
                  </Link>
                ))}
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors wrap-break-word">
                <Link href={`/posts/${post.slug}`}>
                  <span className="absolute inset-0" aria-hidden="true" />
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted mt-2 text-sm leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}