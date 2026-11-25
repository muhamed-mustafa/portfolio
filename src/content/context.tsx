"use client";

import { createContext, useContext, type ReactNode } from "react";
import { content, type Locale } from "./index";

const LocaleContext = createContext<Locale>("en");

export function ContentProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useContent() {
  return content[useContext(LocaleContext)];
}
