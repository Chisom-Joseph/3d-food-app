'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

interface NavbarProps {
  variant?: 'main' | 'detail';
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const mainLinks = [
  { label: 'Explorer', href: '/', active: true },
  { label: 'Collections', href: '#' },
  { label: 'Labs', href: '#' },
];
const detailLinks = [
  { label: 'Explorer', href: '/', active: true },
  { label: 'Lab', href: '#' },
  { label: 'Library', href: '#' },
];

export default function Navbar({ variant = 'main' }: NavbarProps) {
  const [searchVal, setSearchVal] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  const links = variant === 'main' ? mainLinks : detailLinks;

  return (
    <>
      <header className="flex items-center gap-3 md:gap-5 px-4 md:px-6 h-[56px] md:h-[60px] bg-[var(--color-surface)] border-b border-[var(--color-border)] flex-shrink-0 relative z-20 transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          {variant === 'detail' && (
            <span className="hidden sm:inline text-[9px] font-semibold tracking-widest text-[#f48c25] bg-[rgba(244,140,37,0.15)] border border-[rgba(244,140,37,0.4)] rounded px-1.5 py-0.5">
              V2.5.4
            </span>
          )}
        </div>

        {/* Search — hidden on very small screens */}
        <div className="relative flex-1 max-w-[380px] hidden sm:block">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            className="w-full pl-9 pr-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full text-[var(--color-text)] text-[13px] outline-none focus:border-[#f48c25] transition-all placeholder:text-[var(--color-text-3)]"
            placeholder={variant === 'main' ? 'Search Cuisine...' : 'Search ingredients...'}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-[11px] font-semibold tracking-widest uppercase transition-colors ${l.active ? 'text-[#f48c25]' : 'text-[var(--color-text-3)] hover:text-[var(--color-text)]'}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 flex-shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={isDark ? 'Light mode' : 'Dark mode'}
            className="w-8 h-8 md:w-9 md:h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-2)] hover:border-[#f48c25] hover:text-[#f48c25] transition-all"
          >
            <span key={theme} style={{ display: 'flex', animation: 'themeIconIn 0.25s ease' }}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#f48c25] to-[#ff6b00] flex items-center justify-center text-[12px] md:text-[13px] font-bold text-black cursor-pointer flex-shrink-0">
            C
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden w-8 h-8 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-2)] hover:border-[#f48c25] hover:text-[#f48c25] transition-all"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3 flex flex-col gap-3 z-20 transition-colors duration-300">
          {/* Mobile search */}
          <div className="relative sm:hidden">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              className="w-full pl-9 pr-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full text-[var(--color-text)] text-[13px] outline-none focus:border-[#f48c25] transition-all placeholder:text-[var(--color-text-3)]"
              placeholder="Search Cuisine..."
            />
          </div>
          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-[13px] font-semibold tracking-wider transition-colors ${l.active ? 'text-[#f48c25] bg-[rgba(244,140,37,0.08)]' : 'text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)]'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
