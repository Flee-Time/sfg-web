"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { SearchItem } from "@/types/search";

export default function Search() {
  const [query, setQuery] = useState("");
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);

  useEffect(() => {
    const initFuse = async () => {
      try {
        const res = await fetch("/search.json");
        const data: SearchItem[] = await res.json();
        setFuse(new Fuse(data, {
          keys: ["title", "description", "tags"],
          threshold: 0.3,
        }));
      } catch (error) {
        console.error("Search index failed to load:", error);
      }
    };
    initFuse();
  }, []);

  const results = useMemo(() => {
    if (!fuse || query.trim().length <= 1) return [];
    
    return fuse.search(query)
      .map((r) => r.item)
      .slice(0, 5);
  }, [query, fuse]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search entries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-surface border border-border-subtle rounded-md px-4 py-2 text-sm font-mono focus:outline-none focus:border-blue-500 transition-colors text-foreground placeholder:text-muted"
      />
      
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface/95 border border-border-subtle rounded-md shadow-2xl z-50 overflow-hidden backdrop-blur-md">
          {results.map((post) => (
            <Link 
              key={post.slug} 
              href={`/posts/${post.slug}`}
              onClick={() => setQuery("")}
              className="block p-4 hover:bg-border-subtle/30 border-b border-border-subtle last:border-0 transition-colors group"
            > 
              <h4 className="text-sm font-bold text-foreground group-hover:text-blue-400 transition-colors">
                {post.title}
              </h4>
              
              <p className="text-xs text-muted line-clamp-1 mt-1">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}