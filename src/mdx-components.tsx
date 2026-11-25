import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 scroll-mt-24 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="my-5 leading-8 text-foreground/85" {...props} />,
  a: (props) => <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 ps-6 leading-7 text-foreground/85 marker:text-accent" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 ps-6 leading-7 text-foreground/85 marker:text-muted" {...props} />,
  blockquote: (props) => <blockquote className="my-6 border-s-2 border-accent bg-surface-2/50 px-5 py-3 text-muted [&>p]:my-2" {...props} />,
  hr: () => <hr className="my-12 border-border" />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-border bg-surface-2/60 px-4 py-2 text-start font-semibold" {...props} />,
  td: (props) => <td className="border-b border-border px-4 py-2 align-top" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
