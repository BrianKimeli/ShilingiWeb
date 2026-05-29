import type { ReactNode } from "react";

function parseInlineBold(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-semibold text-slate-900">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : [text];
}

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key++} className="article-prose my-8 list-disc space-y-3 pl-6">
        {listItems.map((item, i) => (
          <li key={i}>{parseInlineBold(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="article-prose-heading mt-10 mb-3 text-xl text-slate-900">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="article-prose-heading mt-12 mb-4 text-2xl text-slate-900">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      blocks.push(
        <h2 key={key++} className="article-prose-heading mt-12 mb-4 text-2xl text-slate-900">
          {trimmed.slice(2)}
        </h2>
      );
    } else if (trimmed === "") {
      continue;
    } else {
      blocks.push(
        <p key={key++} className="article-prose-p">
          {parseInlineBold(line)}
        </p>
      );
    }
  }

  flushList();

  return <div className={`article-prose ${className}`}>{blocks}</div>;
}
