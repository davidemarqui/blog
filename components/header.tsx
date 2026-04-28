"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-hn-line px-3 py-2.5 text-[12px] rounded-t-sm bg-hn-panel/50">
      <p className="m-0 min-w-0 text-hn-glow">
        <span className="text-hn-meta">$</span> david@world:<span className="text-hn-orange drop-shadow-[0_0_8px_rgba(196,181,165,0.35)]">~/notes</span>
        <span className="terminal-cursor" aria-hidden />
      </p>
      <nav className="flex shrink-0 gap-x-2 text-hn-meta">
        <Link href="/" className="hover:text-hn-foreground hover:underline">
          follow me
        </Link>
        <span className="text-hn-line">·</span>
        <a
          href="https://x.com/davedemc"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-hn-foreground hover:underline"
        >
          @davedemc
        </a>
      </nav>
    </header>
  )
}
