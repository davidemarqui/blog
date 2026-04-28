import Link from "next/link"

export function IntroBanner() {
  return (
    <section className="border-b border-hn-line bg-hn-bg/80 px-3 py-5 font-mono text-[13px] sm:text-[14px] leading-relaxed">
      <h1 className="m-0 mb-2 text-base sm:text-lg font-normal text-hn-glow hack-glow tracking-tight">
        Sup, I&apos;m David.
      </h1>

      <p className="m-0 mb-3 text-hn-foreground/95 max-w-prose">
        This is my public notes log: rough drafts, bits from the road when there&apos;s something
        worth jotting down, and things I care about. Usually typed on my phone when traveling
        between flights, or late nights. There&apos;s no publishing calendar here; long
        quiet stretches are normal. Don&apos;t expect a magazine; think of it as a folder I left
        open on a shared machine.
      </p>

      <p className="m-0 mb-3 text-hn-meta max-w-prose">
        You might find half-baked ideas about companies I&apos;m building with friends, side
        projects, books, music, or whatever stuck in my head that week.
      </p>

      <p className="m-0 text-hn-meta">
        <span className="text-hn-glow">*</span> links:{" "}
        <Link
          href="https://open.spotify.com/user/31qzwpb6guuqza7kqtvpp2ir2eyi?si=d69bd63033bd4dfb"
          target="_blank"
          className="text-hn-foreground underline decoration-hn-line underline-offset-2 hover:text-hn-glow hover:decoration-hn-glow"
        >
          sick playlists
        </Link>
        <span className="mx-1.5 text-hn-line">·</span>
        <Link
          href="https://x.com/davedemc"
          target="_blank"
          className="text-hn-foreground underline decoration-hn-line underline-offset-2 hover:text-hn-glow hover:decoration-hn-glow"
        >
          x / twitter
        </Link>
      </p>
    </section>
  )
}
