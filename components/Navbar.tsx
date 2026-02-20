'use client';
import Link from 'next/link';
import { useState } from 'react';

interface NavbarProps {
  variant?: 'main' | 'detail';
}

export default function Navbar({ variant = 'main' }: NavbarProps) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className="flex items-center gap-5 px-6 h-[60px] bg-[#141414] border-b border-white/[0.07] flex-shrink-0 relative z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-8 h-8 bg-[#f48c25] rounded-[6px] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-base font-bold tracking-widest text-[#f0f0f0]">
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
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className="w-full pl-9 pr-3 py-2 bg-[#1a1a1a] border border-white/[0.07] rounded-full text-[#f0f0f0] text-[13px] outline-none focus:border-[#f48c25] transition-colors placeholder:text-[#666]"
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
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[#666] hover:text-[#f0f0f0] transition-colors">Collections</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[#666] hover:text-[#f0f0f0] transition-colors">Labs</Link>
          </>
        ) : (
          <>
            <Link href="/" className="text-[11px] font-semibold tracking-widest uppercase text-[#f48c25]">Explorer</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[#666] hover:text-[#f0f0f0] transition-colors">Lab</Link>
            <Link href="#" className="text-[11px] font-semibold tracking-widest uppercase text-[#666] hover:text-[#f0f0f0] transition-colors">Library</Link>
          </>
        )}
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {variant === 'detail' && (
          <button className="w-9 h-9 bg-[#1a1a1a] border border-white/[0.07] rounded-lg flex items-center justify-center text-[#aaa] hover:border-[#f48c25] hover:text-[#f48c25] transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        <button className="w-9 h-9 bg-[#1a1a1a] border border-white/[0.07] rounded-lg flex items-center justify-center text-[#aaa] hover:border-[#f48c25] hover:text-[#f48c25] transition-all">
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
