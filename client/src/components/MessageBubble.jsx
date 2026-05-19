import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBubble({ role, content }) {
  return (
    <div className={`message-row ${role}`}>
      <div className={`message-bubble ${role}`}>
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match?.[1] || "javascript"}
                  PreTag="div"
                  customStyle={{
                    borderRadius: "14px",
                    padding: "18px",
                    fontSize: "14px",
                    overflowX: "auto",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            },

            p({ children }) {
              return <p className="markdown-paragraph">{children}</p>;
            },

            h1({ children }) {
              return <h1 className="markdown-h1">{children}</h1>;
            },

            h2({ children }) {
              return <h2 className="markdown-h2">{children}</h2>;
            },

            li({ children }) {
              return <li className="markdown-li">{children}</li>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}