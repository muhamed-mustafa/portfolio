"use client";

import dynamic from "next/dynamic";

export const CommandMenuLazy = dynamic(() => import("./command-menu").then((m) => m.CommandMenu), { ssr: false });
