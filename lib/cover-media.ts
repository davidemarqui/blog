const VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov|m4v|m3u8)$/i

export type CoverKind =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "video"; url: string }
  | { kind: "image"; url: string }

function youtubeIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0]
      return id || null
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") return u.searchParams.get("v")
      const embed = u.pathname.match(/^\/embed\/([^/]+)/)
      if (embed) return embed[1]
      const shorts = u.pathname.match(/^\/shorts\/([^/]+)/)
      if (shorts) return shorts[1]
    }
  } catch {
    return null
  }
  return null
}

function vimeoIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, "")
    if (host !== "vimeo.com" && host !== "player.vimeo.com") return null
    const m = u.pathname.match(/\/(?:video\/)?(\d+)/)
    return m?.[1] ?? null
  } catch {
    return null
  }
}

/** Classify `cover_image` URL for image vs embedded / native video. */
export function classifyCoverMedia(url: string): CoverKind | null {
  const trimmed = url?.trim()
  if (!trimmed) return null

  const yt = youtubeIdFromUrl(trimmed)
  if (yt) return { kind: "youtube", id: yt }

  const vm = vimeoIdFromUrl(trimmed)
  if (vm) return { kind: "vimeo", id: vm }

  const pathOnly = trimmed.split("?")[0]?.split("#")[0] ?? trimmed
  if (VIDEO_EXT.test(pathOnly)) return { kind: "video", url: trimmed }

  return { kind: "image", url: trimmed }
}
