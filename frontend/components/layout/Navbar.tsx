import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span
            id="app-brand-mark"
            className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-brand/20 bg-brand text-white shadow-sm"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1 h-2.5 w-5 -translate-x-1/2 rounded-[50%] bg-[#D8C891] shadow-[inset_0_-2px_0_rgba(74,60,34,0.35)]" />
            <span className="absolute top-3 h-3.5 w-5 rounded-full bg-[#D99258]" />
            <span className="absolute left-[7px] top-[15px] h-1 w-1 rounded-full bg-[#21140F]" />
            <span className="absolute right-[7px] top-[15px] h-1 w-1 rounded-full bg-[#21140F]" />
            <span className="absolute left-1/2 top-[18px] h-1.5 w-5 -translate-x-1/2 rounded-full bg-[#244C43]" />
          </span>
          <span className="font-display text-[15px] font-bold tracking-tight text-ink">
            Chaukidar
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="/#how-it-works" className="hover:text-ink">
            How it works
          </a>
          <Link href="/audits/new" className="hover:text-ink">
            New audit
          </Link>
          <Link href="/audits" className="hover:text-ink">
            Past audits
          </Link>
        </nav>

        <Link
          href="/audits/new"
          className="rounded-sm bg-brand px-3.5 py-2 text-sm font-medium text-white transition hover:bg-brand-soft"
        >
          Run a sample audit
        </Link>
      </div>
    </header>
  );
}
