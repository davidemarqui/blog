import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import "./globals.css"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "</>",
  description: "The blog that provides a glimpse inside of the mind of the entrepreneur and engineer Davi Demarqui.",
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
        <ThemeProvider>
          <div className="max-w-3xl mx-auto px-4">
            <Header />
              <main>{children}</main>
              <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

