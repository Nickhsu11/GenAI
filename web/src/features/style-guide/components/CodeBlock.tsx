import React from 'react';

type CodeBlockProps = {
  children: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => (
  <pre
    className="text-s-regular"
    style={{
      background: 'var(--color-neutral-50)',
      border: '1px solid var(--color-neutral-200)',
      borderRadius: '4px',
      padding: '12px 16px',
      margin: 0,
      overflow: 'auto',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      whiteSpace: 'pre',
    }}
  >
    <code>{children}</code>
  </pre>
);
