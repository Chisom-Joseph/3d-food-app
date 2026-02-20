'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import MenuGallery from '@/components/MenuGallery';
import NutritionPanel from '@/components/NutritionPanel';
import { foodItems, mainGalleryItems, getFoodBySlug } from '@/lib/foodData';

const FoodViewer3D = dynamic(() => import('@/components/FoodViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
      <div className="text-[56px] animate-float">🍽️</div>
      <p className="text-[13px] font-bold tracking-[0.15em] text-[#f48c25]">LOADING 3D ENGINE...</p>
    </div>
  ),
});

const emojiMap: Record<string, string> = {
  torus: '🍣', sphere: '🍔', icosahedron: '🥗', cylinder: '🥣', octahedron: '🐟',
};

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState('sushi-platter');
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [mobileTab, setMobileTab] = useState<'viewer' | 'info'>('viewer');

  const dish = getFoodBySlug(selectedSlug) || foodItems[0];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-bg)] transition-colors duration-300">
      <Navbar variant="main" />

      {/* ── MOBILE LAYOUT (below md) ── */}
      <div className="flex flex-col flex-1 min-h-0 md:hidden">
        {/* Horizontal dish strip */}
        <div className="flex gap-2 px-3 py-2 overflow-x-auto bg-[var(--color-surface)] border-b border-[var(--color-border)] flex-shrink-0" style={{ scrollbarWidth: 'none' }}>
          {mainGalleryItems.map((item) => {
            const active = item.slug === selectedSlug;
            return (
              <button
                key={item.slug}
                onClick={() => setSelectedSlug(item.slug)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold flex-shrink-0 border transition-all ${
                  active
                    ? 'border-[#f48c25] bg-[rgba(244,140,37,0.12)] text-[#f48c25]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-2)]'
                }`}
              >
                <span>{emojiMap[item.shape] || '🍽️'}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {mobileTab === 'viewer' ? (
            <FoodViewer3D
              dish={dish}
              showAnnotations={showAnnotations}
              onToggleAnnotations={() => setShowAnnotations(v => !v)}
            />
          ) : (
            <div className="h-full overflow-y-auto">
              <NutritionPanel dish={dish} />
            </div>
          )}
        </div>

        {/* Mobile bottom tab bar */}
        <div className="flex border-t border-[var(--color-border)] bg-[var(--color-surface)] flex-shrink-0">
          <button
            onClick={() => setMobileTab('viewer')}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold tracking-widest transition-colors ${mobileTab === 'viewer' ? 'text-[#f48c25]' : 'text-[var(--color-text-3)]'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            3D VIEW
            {mobileTab === 'viewer' && <div className="w-4 h-0.5 bg-[#f48c25] rounded-full" />}
          </button>
          <button
            onClick={() => setMobileTab('info')}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold tracking-widest transition-colors ${mobileTab === 'info' ? 'text-[#f48c25]' : 'text-[var(--color-text-3)]'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            NUTRITION
            {mobileTab === 'info' && <div className="w-4 h-0.5 bg-[#f48c25] rounded-full" />}
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (md+) ── */}
      <div className="hidden md:flex flex-1 overflow-hidden min-h-0">
        <MenuGallery
          items={mainGalleryItems}
          selectedSlug={selectedSlug}
          onSelect={setSelectedSlug}
        />
        <FoodViewer3D
          dish={dish}
          showAnnotations={showAnnotations}
          onToggleAnnotations={() => setShowAnnotations(v => !v)}
        />
        <NutritionPanel dish={dish} />
      </div>
    </div>
  );
}
