"use client"
import { PostList } from "@/components/post-list"
import type { Post } from "@/lib/types"
import { useEffect, useState } from "react"
import { IntroBanner } from "@/components/IntroBanner"

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("/api/posts")
    if (!res.ok) return []
    const data = await res.json()
    return data as Post[]
  } catch (err) {
    console.error("Error fetching posts:", err)
    return []
  }
}

// Home should not be async if it's a Client Component
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <>
      <IntroBanner />
      <PostList posts={posts} />
    </>
  )
}
