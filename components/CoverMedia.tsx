import Image from "next/image"
import { classifyCoverMedia } from "@/lib/cover-media"

const frameClass = "w-full border-y border-hn-line bg-black"

type Props = {
  url: string
  title: string
}

export function CoverMedia({ url, title }: Props) {
  const media = classifyCoverMedia(url)
  if (!media) return null

  if (media.kind === "youtube") {
    return (
      <div className={`${frameClass} aspect-video`}>
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(media.id)}`}
          className="h-full w-full"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  if (media.kind === "vimeo") {
    return (
      <div className={`${frameClass} aspect-video`}>
        <iframe
          title={title}
          src={`https://player.vimeo.com/video/${encodeURIComponent(media.id)}`}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  if (media.kind === "video") {
    return (
      <video
        className={frameClass}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
      >
        <source src={media.url} />
      </video>
    )
  }

  return (
    <Image
      src={media.url}
      alt={title}
      width={1200}
      height={600}
      className={`${frameClass} h-auto w-full`}
    />
  )
}
