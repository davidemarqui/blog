import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { Providers } from "@/components/providers"
import "./globals.css"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "𝑫𝒂𝒛",
  description: "The blog that provides a glimpse inside of the mind of Daz.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="icon.ico" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Providers>
          <div className="max-w-3xl mx-auto border-x border-zinc-700 min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

