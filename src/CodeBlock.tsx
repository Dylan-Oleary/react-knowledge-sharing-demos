import type { FC } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

function highlightLine(line: string): string {
  // Basic HTML escaping
  let escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments: only treat // as comment when at start of line or after whitespace
  escaped = escaped.replace(
    /(^|\s)(\/\/.*$)/g,
    '$1<span class="code-token-comment">$2</span>'
  );

  // Strings
  escaped = escaped.replace(
    /(&quot;[^&]*?&quot;|'[^']*'|`[^`]*`)/g,
    '<span class="code-token-string">$1</span>'
  );

  // Keywords / identifiers (very small set for demo)
  escaped = escaped.replace(
    /\b(const|let|var|function|return|import|from|ReactDOM?|createRoot|createElement)\b/g,
    '<span class="code-token-keyword">$1</span>'
  );

  // HTML-ish tags: color tag name and attributes separately
  escaped = escaped.replace(
    /(&lt;\/?)([a-zA-Z0-9-]+)([^&]*?&gt;)/g,
    (_match, open, name, rest) => {
      const highlightedRest = (rest as string).replace(
        /([a-zA-Z_:][a-zA-Z0-9_:.-]*)(=)/g,
        '<span class="code-token-attr">$1</span>$2'
      );
      return `${open}<span class="code-token-tag">${name}</span>${highlightedRest}`;
    }
  );

  return escaped || "&nbsp;";
}

const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div className="code-block">
      <pre>
        {lines.map((line, index) => (
          <div className="code-line" key={index}>
            <span className="code-line-number">{index + 1}</span>
            <span
              className="code-line-content"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CodeBlock;
