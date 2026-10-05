import React from 'react';
import Link from 'next/link';

const NAV = [
  { href: '/#science', label: 'Science' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
  { href: '/investors', label: 'Investors' },
];

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-site flex items-center justify-between gap-4 py-4">
        <Link href="/" className="shrink-0" aria-label="CortiAura home">
          <img src="/assets/logo.svg" alt="CortiAura" className="h-8 w-auto md:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-raisin transition-colors hover:text-garnet">
              {item.label}
            </Link>
          ))}
          <Link
            href="/founding"
            className="inline-flex min-h-[44px] items-center rounded-md bg-garnet px-5 font-semibold text-white transition-colors hover:bg-imperial"
          >
            Join the Founding Community
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-3 font-medium text-raisin hover:bg-misty"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/founding" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              Join the Founding Community
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
