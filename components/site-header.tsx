import Link from "next/link";

import { SearchButton } from "@/components/search-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-zinc-200/80 bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:px-6">
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-zinc-900 transition-opacity duration-200 hover:opacity-75"
      >
        Concepts
      </Link>
      <SearchButton />
    </header>
  );
}
