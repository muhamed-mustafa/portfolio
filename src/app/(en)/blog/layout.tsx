import type { ReactNode } from "react";
import { BlogShell } from "@/components/blog-shell";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <BlogShell back={{ href: "/", label: "Portfolio" }}>{children}</BlogShell>;
}
