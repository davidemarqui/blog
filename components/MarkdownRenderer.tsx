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
      prose-headings:text-zinc-200 
      prose-headings:font-bold
      prose-headings:border-zinc-800 
      prose-headings:pt-5 
      prose-headings:pb-1
      prose-h1:text-4xl 
      prose-h1:mb-6 
      prose-h2:text-xl 
      prose-h2:mt-10 
      prose-h2:mb-4 
      prose-h3:text-2xl 
      prose-h3:mt-8 
      prose-h3:mb-3  
      prose-p:text-[#8f8f8f] 
      prose-p:text-md 
      prose-a:underline 
      prose-a:transition 
      prose-a:duration-300 
      prose-a:hover:text-zinc-300 
      prose-code:text-pink-300 
      prose-pre:bg-gray-800 
      prose-pre:p-4 
      prose-pre:rounded-lg 
      prose-code:bg-gray-700 
      prose-code:rounded-md 
      prose-code:px-1 
      prose-code:py-0.5 
      prose-hr:my-8 
      prose-hr:border-t-2 
      prose-blockquote:border-l-4 
      prose-blockquote:border-gray-500 
      prose-blockquote:pl-4 
      prose-blockquote:italic 
      prose-blockquote:text-gray-400 
      max-w-none 
      w-full 
      space-y-4 
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
          background-color: #18181b;
          border: 1px solid #27272a;
          color: #8f8f8f;
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