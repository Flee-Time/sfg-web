import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start space-y-8 py-12">
      <div className="space-y-2">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-red-500 font-bold">
          [ Error_Report ]
        </h2>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          404: Entry Not Found
        </h1>
      </div>

      <div className="border-l-2 border-border-subtle pl-6 space-y-4 max-w-prose">
        <p className="text-muted font-mono text-sm leading-relaxed">
          The requested address does not exist in the current page table. The
          entry may have been moved, deleted, or never written in the first
          place.
        </p>
      </div>

      <Link
        href="/"
        className="text-sm text-blue-600 font-bold hover:text-blue-400 transition-colors"
      >
        ← Return to home
      </Link>
    </div>
  );
}