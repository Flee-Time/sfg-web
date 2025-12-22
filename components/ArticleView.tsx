"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface ArticleViewProps {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
    tags?: string[];
    thumbnail?: string;
  };
}

export default function ArticleView({ postData }: ArticleViewProps) {
  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [contentModalData, setContentModalData] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);

  return (
    <article className="p-1 max-w-none">
      <ImageModal
        isOpen={heroModalOpen || !!contentModalData}
        src={contentModalData?.src || postData.thumbnail || ""}
        alt={contentModalData?.alt || postData.title}
        width={contentModalData?.width || 1200}
        height={contentModalData?.height || 800}
        onClose={() => {
          setHeroModalOpen(false);
          setContentModalData(null);
        }}
      />

      <header className="mb-6 border-b border-border-subtle pb-3">
        <Link
          href="/"
          className="text-sm text-blue-600 font-bold hover:text-blue-400 transition-all block mb-6 mt-6"
        >
          ← All entries
        </Link>

        {postData.thumbnail && (
          <div 
            className="mb-6 cursor-zoom-in rounded-xl overflow-hidden border border-border-subtle"
            onClick={() => setHeroModalOpen(true)}
          >
            <Image
              src={postData.thumbnail}
              alt={postData.title}
              width={1200}
              height={800}
              priority
              className="w-full h-auto block"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        <h1 className="text-4xl font-black mt-1 leading-tight text-foreground">
          {postData.title}
        </h1>

        <div className="flex items-center gap-4 mt-2 text-muted font-mono text-sm">
          <span>{postData.date}</span>
          <span className="text-border-subtle">|</span>
          <div className="flex gap-2 relative z-10">
            {postData.tags?.map((tag: string) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="hover:text-blue-600 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div
        className="
          prose dark:prose-invert 
          prose-img:rounded-xl prose-img:cursor-zoom-in
          max-w-none
        "
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "IMG") {
            const img = target as HTMLImageElement;
            setContentModalData({ 
              src: img.src, 
              alt: img.alt,
              width: img.naturalWidth,
              height: img.naturalHeight
            });
          }
        }}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

      <div className="mt-8 pt-4 border-t border-border-subtle">
        <Link
          href="/"
          className="text-sm text-blue-600 font-bold hover:text-blue-400 transition-all"
        >
          ← All entries
        </Link>
      </div>
    </article>
  );
}