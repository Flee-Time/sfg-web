import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Image from "next/image";

export default function Home() {
  const allPosts = getSortedPostsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Koray Bilir",
    url: "https://web.sfg.quest",
    jobTitle: "Software Developer",
    sameAs: [
      "https://github.com/Flee-Time",
      "https://www.linkedin.com/in/fleetimee/",
    ],
  };

  return (
    <main className="max-w-none mx-auto p-4 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-8 pt-6">
        <h1 className="text-3xl font-bold mt-4 capitalize mb-2 border-b border-border-subtle pb-2">
          Recent Entries
        </h1>
        <p className="text-muted">{allPosts.length} entries found</p>
      </header>
      <section>
        <ul className="space-y-8">
          {allPosts.map((post) => (
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

                  {post.tags?.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag.toLowerCase()}`}
                      className="text-[10px] uppercase tracking-widest border border-border-subtle px-2 py-0.5 rounded text-muted hover:border-blue-400 hover:text-blue-400 transition-colors font-mono whitespace-nowrap"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors wrap-break-word">
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
      </section>
    </main>
  );
}
