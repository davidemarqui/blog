"use client"

import { Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "./theme-provider"

export function Header() {
  // const { toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between py-6 border-b border-zinc-400">
      <Link
        href="/"
        className="text-xl font-bold"
        style={{ fontFamily: 'Space, "Courier New", monospace' }}
      >
        DDB
      </Link>
      <nav className="flex text-sm font-mono items-center gap-6">
        {/* <Link href="/about" className="hover:text-gray-600 dark:hover:text-[#ef4444]">
          About
        </Link> */}
        <a
          href="https://x.com/davedemc"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white py-1 px-2 hover:bg-white hover:text-black"
        >
          Follow me
        </a>
      </nav>
    </header>
  )
}

