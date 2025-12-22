import Link from 'next/link';

export default function FeedsPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Subscribe to the Lab Notebook
      </h1>
      
      <p className="mb-8 text-muted leading-relaxed">
        The best way to follow my updates is via an RSS reader.
        <br/>
        Copy one of the URLs below and paste it into your reader.
      </p>

      <div className="space-y-4">
        <FeedOption label="RSS Feed (Standard)" url="https://web.sfg.quest/rss.xml" />
        <FeedOption label="Atom Feed" url="https://web.sfg.quest/atom.xml" />
        <FeedOption label="JSON Feed" url="https://web.sfg.quest/feed.json" />
      </div>
    </div>
  );
}

function FeedOption({ label, url }: { label: string, url: string }) {
  return (
    <div className="border border-border-subtle p-4 rounded-lg bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
      <div className="min-w-0">
        <div className="font-semibold text-foreground mb-1">{label}</div>
        <code className="text-xs text-muted break-all font-mono block">
          {url}
        </code>
      </div>
      
      <Link 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded hover:opacity-80 transition-opacity text-center whitespace-nowrap"
      >
        View Raw
      </Link>
    </div>
  );
}