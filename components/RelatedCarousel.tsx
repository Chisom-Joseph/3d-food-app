'use client';
import Link from 'next/link';
import { foodItems } from '@/lib/foodData';
import { useRef } from 'react';

interface RelatedCarouselProps {
  slugs: string[];
}

const emojiMap: Record<string, string> = {
  torus: '🍣', sphere: '🍔', icosahedron: '🥗', cylinder: '🥣', octahedron: '🐟',
};

export default function RelatedCarousel({ slugs }: RelatedCarouselProps) {
  const related = foodItems.filter((f) => slugs.includes(f.slug));
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="px-6 py-4 border-t border-white/[0.07] bg-[#141414] flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[9px] font-bold tracking-[0.12em] text-[#f48c25] mb-0.5">NAVIGATION</p>
          <p className="text-[14px] font-bold text-[#f0f0f0]">Related Items</p>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-white/[0.07] text-[#aaa] flex items-center justify-center hover:border-[#f48c25] hover:text-[#f48c25] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-white/[0.07] text-[#aaa] flex items-center justify-center hover:border-[#f48c25] hover:text-[#f48c25] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/dish/${item.slug}`}
            className="flex-shrink-0 w-[110px] flex flex-col gap-1.5 cursor-pointer hover:-translate-y-1 transition-transform"
          >
            <div
              className="w-[110px] h-20 rounded-lg border border-white/[0.07] flex items-center justify-center hover:border-[#f48c25] transition-colors"
              style={{ background: `radial-gradient(circle at 40% 40%, ${item.glowColor}22, ${item.color}11)` }}
            >
              <span style={{ fontSize: 36, filter: `drop-shadow(0 0 10px ${item.glowColor}88)` }}>
                {emojiMap[item.shape] || '🍽️'}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-[#f0f0f0] truncate">{item.name}</p>
            <p className="text-[10px] text-[#f48c25] font-medium">{item.calories} kcal</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
