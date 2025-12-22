import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Search from "@/components/Search";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lab Notebook | sfg-web",
  description:
    "Koray's public lab notes on embedded systems, Linux, hardware, and whatever I'm currently obsessed with.",
  keywords: [
    "Koray",
    "Koray Bilir",
    "FleeTime",
    "Flee-Time",
    "sfg-web",
  ],
  openGraph: {
    title: "Koray - Lab Notebook",
    description: "Koray's public lab notebook.",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  metadataBase: new URL('https://web.sfg.quest'),
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'sfg-web RSS Feed' }],
      'application/atom+xml': [{ url: '/atom.xml', title: 'sfg-web Atom Feed' }],
      'application/feed+json': [{ url: '/feed.json', title: 'sfg-web JSON Feed' }],
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 lg:py-12">
          
          <header className="lg:hidden border-b border-border-subtle pb-4">
            <div className="flex justify-between items-center mb-6">
              <Link
                href="/"
                className="text-2xl font-black hover:text-blue-400 transition-colors"
              >
                sfg-web
              </Link>
              <nav className="flex gap-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                <Link href="/" className="hover:text-blue-400 px-2 py-1">
                  [ home ]
                </Link>
                <Link href="/about" className="hover:text-blue-400 px-2 py-1">
                  [ about ]
                </Link>
              </nav>
            </div>

            <div className="w-full">
              <Search />
            </div>
          </header>

          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:block lg:col-span-3">
              <nav className="sticky top-12 space-y-3">
                <div>
                  <Link
                    href="/"
                    className="text-3xl font-black block hover:text-blue-400 transition-colors"
                  >
                    sfg-web
                  </Link>
                  <p className="text-[10px] text-muted mt-1 font-mono uppercase tracking-[0.2em]">
                    Lab Notebook
                  </p>
                </div>

                <div className="">
                  <Search />
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase text-muted font-bold tracking-widest">
                    Navigation
                  </h4>
                  <ul className="text-sm font-mono space-y-3 px-2">
                    <li>
                      <Link
                        href="/"
                        className="group flex items-center gap-2 text-muted hover:text-blue-400"
                      >
                        - Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="group flex items-center gap-2 text-muted hover:text-blue-400"
                      >
                        - About me
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>

            <main className="lg:col-span-9">
              <div className="max-w-prose mx-auto lg:mx-0">{children}</div>
            </main>
          </div>
        </div>

        <footer className="w-full border-t border-border-subtle bg-surface">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted font-mono">
            <span>© {new Date().getFullYear()} sfg-web // Koray Bilir</span>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Flee-Time/sfg-web"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <span className="text-border-subtle">|</span>
              <a
                href="/feeds"
                className="hover:text-orange-400 transition-colors"
              >
                RSS
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}