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
      <body className="min-h-screen antialiased bg-hn-bg text-hn-foreground font-mono text-[13px] leading-relaxed selection:bg-hn-line selection:text-hn-glow">
        <Providers>
          <div className="min-h-screen max-w-3xl mx-auto px-2 sm:px-3 py-2 sm:py-3">
            <div className="hack-frame border border-hn-line bg-hn-panel">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
