'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

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

export default function Navbar({ variant = 'main' }: NavbarProps) {
  const [searchVal, setSearchVal] = useState('');
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className="flex items-center gap-5 px-6 h-[60px] bg-[var(--color-surface)] border-b border-[var(--color-border)] flex-shrink-0 relative z-10 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 bg-[#f48c25] rounded-[6px] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-base font-bold tracking-widest text-[var(--color-text)] transition-colors duration-300">
          {variant === 'main' ? (
            <>GASTRO<span className="text-[#f48c25]">3D</span></>
          ) : (
            <>FOOD <span className="text-[#f48c25]">EXPLORER</span></>
          )}
        </span>
        {variant === 'detail' && (
          <span className="text-[9px] font-semibold tracking-widest text-[#f48c25] bg-[rgba(244,140,37,0.15)] border border-[rgba(244,140,37,0.4)] rounded px-1.5 py-0.5">
            VERSION 2.5.4
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-[380px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-3)]" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className="w-full pl-9 pr-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full text-[var(--color-text)] text-[13px] outline-none focus:border-[#f48c25] transition-all placeholder:text-[var(--color-text-3)]"
          placeholder={variant === 'main' ? 'Search Cuisine...' : 'Explore 3D ingredients, recipes, or nutrients...'}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-6 ml-auto">
        {variant === 'main' ? (
          <>
            <Link href="/" className="text-[11px] font-semibold tracking-widest uppercase text-[#f48c25]">Explorer</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-3)] hover:text-[var(--color-text)] transition-colors">Collections</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-3)] hover:text-[var(--color-text)] transition-colors">Labs</Link>
          </>
        ) : (
          <>
            <Link href="/" className="text-[11px] font-semibold tracking-widest uppercase text-[#f48c25]">Explorer</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-3)] hover:text-[var(--color-text)] transition-colors">Lab</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-3)] hover:text-[var(--color-text)] transition-colors">Library</Link>
          </>
        )}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {variant === 'detail' && (
          <button className="w-9 h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-2)] hover:border-[#f48c25] hover:text-[#f48c25] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-9 h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-2)] hover:border-[#f48c25] hover:text-[#f48c25] transition-all"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <span
            key={theme}
            style={{
              display: 'flex',
              animation: 'themeIconIn 0.25s ease',
            }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </span>
        </button>

        <button className="w-9 h-9 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg flex items-center justify-center text-[var(--color-text-2)] hover:border-[#f48c25] hover:text-[#f48c25] transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="21" r="1" fill="currentColor"/>
            <circle cx="20" cy="21" r="1" fill="currentColor"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f48c25] to-[#ff6b00] flex items-center justify-center text-[13px] font-bold text-black cursor-pointer flex-shrink-0">
          C
        </div>
      </div>
    </header>
  );
}
