export function Footer() {
  return (
    <footer className="border-t border-hn-line px-3 py-2 text-center text-[11px] text-hn-meta">
      <a href="/" className="text-hn-foreground hover:text-hn-glow hover:underline">
        home
      </a>
      <span className="mx-1.5 text-hn-line">·</span>
      <a
        href="https://x.com/davedemc"
        target="_blank"
        rel="noopener noreferrer"
        className="text-hn-foreground hover:text-hn-glow hover:underline"
      >
        @davedemc
      </a>
    </footer>
  )
}
