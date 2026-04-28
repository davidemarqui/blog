import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div
      className={`
      prose
      prose-invert
      prose-headings:text-[#c8ccd8]
      prose-headings:font-semibold
      prose-headings:tracking-tight
      prose-headings:border-hn-line
      prose-headings:pt-5
      prose-headings:pb-1
      prose-h1:text-2xl
      prose-h1:mb-4
      prose-h2:text-xl
      prose-h2:mt-8
      prose-h2:mb-3
      prose-h3:text-lg
      prose-h3:mt-6
      prose-h3:mb-2
      prose-p:text-[#e0ddd9]
      prose-p:text-[15px]
      prose-p:leading-[1.75]
      prose-a:text-[#b8cce8]
      prose-a:no-underline
      prose-a:underline-offset-2
      prose-a:hover:underline
      prose-strong:text-hn-foreground
      prose-em:text-hn-foreground/95
      prose-code:text-[#d4c4d0]
      prose-pre:bg-hn-panel
      prose-pre:border
      prose-pre:border-hn-line
      prose-pre:p-4
      prose-pre:rounded-sm
      prose-pre:text-[13px]
      prose-pre:leading-relaxed
      prose-code:bg-hn-panel
      prose-code:border
      prose-code:border-hn-line/60
      prose-code:rounded-sm
      prose-code:px-1.5
      prose-code:py-0.5
      prose-code:text-[0.9em]
      prose-hr:my-8
      prose-hr:border-hn-line
      prose-blockquote:border-l-[3px]
      prose-blockquote:border-[#b4c9c4]/50
      prose-blockquote:pl-4
      prose-blockquote:italic
      prose-blockquote:text-hn-meta
      prose-li:marker:text-hn-meta
      max-w-[65ch]
      mx-auto
      w-full
      space-y-4
      font-mono
      ${className ?? ""}
    `}
    >
      <style>{`
        .prose ol {
          counter-reset: list-counter;
          list-style: none;
          padding-left: 2.5rem;
        }
        .prose ol li {
          counter-increment: list-counter;
          position: relative;
        }
        .prose ol li::before {
          content: counter(list-counter);
          position: absolute;
          left: -2.5rem;
          top: 0.2rem;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #060608;
          border: 1px solid #1a2220;
          color: #7a8a84;
          font-weight: 600;
          border-radius: 3px;
          font-size: 0.8125rem;
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          ol: ({ node, className: olClass, ...props }) => (
            <ol className={`space-y-2 ${olClass ?? ""}`} {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const isBlock = String(className ?? "").includes("language-")
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code
                className={`${className ?? ""} rounded-sm border border-hn-line/60 bg-hn-panel px-1.5 py-0.5 text-[0.9em] text-[#d4c4d0]`}
                {...props}
              >
                {children}
              </code>
            )
          },
          hr: () => <hr className="my-8 w-full border-t border-hn-line" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
