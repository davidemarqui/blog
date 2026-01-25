"use client"

import Link from "next/link"

export function Header() {
  // const { toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between px-6 border-b border-zinc-700">
      <Link
        href="/"
        className="text-[40px] m-0 font-bold"
        style={{
          fontFamily: 'Space, "Courier New", monospace',
          background: 'linear-gradient(45deg, #e5e7eb, #fff, #6b7280, #e5e7eb)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientShift 2s ease infinite'
        }}
      >
        ⚡︎
      </Link>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `
      }} />
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

