import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { Providers } from "@/components/providers"
import "./globals.css"
import type React from "react"

export const metadata = {
  title: "David Notes",
  description:
    "Personal notes by David: fragments written on the road while traveling the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="icon.ico" />
      </head>
      <body className="min-h-screen antialiased bg-black text-hn-foreground font-mono text-[14px] leading-relaxed selection:bg-hn-line selection:text-hn-glow">
        <Providers>
          <div className="relative min-h-screen max-w-3xl mx-auto px-2 sm:px-3 py-3 sm:py-5">
            <div
              className="terminal-pulse-glow pointer-events-none absolute inset-x-4 top-4 bottom-4 z-0 rounded-md blur-2xl sm:inset-x-6 sm:top-6 sm:bottom-6"
              aria-hidden
            />
            <div className="hack-frame relative z-10 overflow-hidden rounded-sm border border-hn-line/90 bg-hn-panel bg-gradient-to-b from-[#0a100e]/90 to-black">
              <div
                className="terminal-phosphor-wash pointer-events-none absolute inset-0 z-[1] rounded-sm"
                aria-hidden
              />
              <div
                className="terminal-scanlines pointer-events-none absolute inset-0 z-[2] rounded-sm"
                aria-hidden
              />
              <div
                className="terminal-vignette pointer-events-none absolute inset-0 z-[3] rounded-sm"
                aria-hidden
              />
              <div className="relative z-10">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
