import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  return (
    <div className={`
      prose 
      prose-invert 
      prose-headings:text-[#9fe8b8]
      prose-headings:font-bold
      prose-headings:border-hn-line
      prose-headings:pt-5
      prose-headings:pb-1
      prose-h1:text-2xl
      prose-h1:mb-4
      prose-h2:text-lg
      prose-h2:mt-8
      prose-h2:mb-3
      prose-h3:text-base
      prose-h3:mt-6
      prose-h3:mb-2
      prose-p:text-[#b0d4bf]
      prose-p:text-[13px]
      prose-p:leading-relaxed
      prose-a:text-[#39ff9a]
      prose-a:no-underline
      prose-a:underline-offset-2
      prose-a:hover:underline
      prose-code:text-[#ffb4d9]
      prose-pre:bg-hn-panel
      prose-pre:border
      prose-pre:border-hn-line
      prose-pre:p-4
      prose-pre:rounded-sm
      prose-code:bg-hn-panel
      prose-code:border
      prose-code:border-hn-line/50
      prose-code:rounded-sm
      prose-code:px-1
      prose-code:py-0.5
      prose-hr:my-8
      prose-hr:border-hn-line
      prose-blockquote:border-l-4
      prose-blockquote:border-hn-glow/40
      prose-blockquote:pl-4
      prose-blockquote:italic
      prose-blockquote:text-hn-meta
      max-w-none
      w-full
      space-y-4
      font-mono
      ${className}
    `}>
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
          top: 0.25rem;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0a110d;
          border: 1px solid #1e3d2c;
          color: #5d8f72;
          font-weight: bold;
          border-radius: 3px;
          font-size: 0.875rem;
        }
      `}</style>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          ol: ({ node, className, ...props }) => (
            <ol className={`space-y-2 ${className}`} {...props} />
          ),
          // h2: ({ node, className, ...props }) => (
          //   <h2 style={{ fontFamily: 'Space, "Courier New", monospace' }} className={`space-y-1 ${className}`} {...props} />
          // ),
          code: ({ node, className, children, ...props }) => {
            return (
              <code 
                className={`
                  ${className} 
                  text-sm 
                  rounded-md 
                  bg-gray-700 
                  text-pink-300 
                  px-1 
                  py-0.5
                `}
                {...props}
              >
                {children}
              </code>
            )
          },
          hr: () => (
            <hr className="my-8 border-t-2 border-zinc-800 w-full mx-auto" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer;