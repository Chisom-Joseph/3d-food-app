'use client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { use } from 'react';
import { getFoodBySlug } from '@/lib/foodData';
import Navbar from '@/components/Navbar';
import MacroCircle from '@/components/MacroCircle';
import VitaminBars from '@/components/VitaminBars';
import RelatedCarousel from '@/components/RelatedCarousel';

const FoodViewer3D = dynamic(() => import('@/components/FoodViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
      <div className="text-[64px] animate-float">✨</div>
      <p className="text-[13px] font-bold tracking-[0.15em] text-[#f48c25] mt-4">LOADING 3D ENGINE...</p>
    </div>
  ),
});

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DishPage({ params }: Props) {
  const { slug } = use(params);
  const dish = getFoodBySlug(slug);
  if (!dish) notFound();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-bg)] transition-colors duration-300">
      <Navbar variant="detail" />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: viewer + title */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="px-6 pt-5 pb-3 flex flex-col gap-2 flex-shrink-0 bg-[var(--color-bg)] transition-colors duration-300">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-extrabold tracking-widest text-black bg-[#f48c25] w-fit">
              {dish.tag}
            </span>
            <h1 className="text-[32px] font-extrabold leading-tight tracking-tight">
              <span className="text-[var(--color-text)] italic">{dish.name.split(' ')[0]} </span>
              <span className="text-[#f48c25] block uppercase">{dish.name.split(' ').slice(1).join(' ')}</span>
            </h1>
            <div className="flex gap-4 text-[12px] text-[var(--color-text-2)] font-medium">
              <span>🔥 {dish.calories} kcal</span>
              <span>⏱ {dish.prepTime}</span>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <FoodViewer3D dish={dish} showAnnotations={true} onToggleAnnotations={() => {}} />
          </div>
        </div>

        {/* Right: Nutritional panel */}
        <aside className="w-[280px] flex-shrink-0 bg-[var(--color-surface)] border-l border-[var(--color-border)] px-4 py-4 overflow-y-auto flex flex-col gap-3.5 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[var(--color-text)]">Nutritional Data</h2>
            <button className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#f48c25] cursor-pointer hover:opacity-70 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              DOWNLOAD REPORT
            </button>
          </div>

          <div className="flex justify-around items-center">
            {[
              { label: 'PROTEIN', g: dish.macros.protein.g, pct: dish.macros.protein.pct, color: '#f48c25' },
              { label: 'CARBS',   g: dish.macros.carbs.g,   pct: dish.macros.carbs.pct,   color: '#4da6ff' },
              { label: 'FATS',    g: dish.macros.fats.g,    pct: dish.macros.fats.pct,    color: '#51cf66' },
            ].map((m) => (
              <div key={m.label} className="flex flex-col items-center gap-1">
                <MacroCircle label={m.label} value={m.g} pct={m.pct} color={m.color} size={80} />
                <p className="text-[13px] font-bold text-[var(--color-text)]">{m.g}g</p>
                <p className="text-[9px] font-bold tracking-widest text-[var(--color-text-3)]">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-[var(--color-border)]" />

          <VitaminBars vitamins={dish.vitamins} />

          <div className="w-full h-px bg-[var(--color-border)]" />

          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[14px]">🍽️</span>
              <h3 className="text-[12px] font-bold text-[var(--color-text)]">Ingredients Anatomy</h3>
            </div>
            <div className="flex flex-col gap-2">
              {dish.ingredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[rgba(244,140,37,0.15)] border border-[rgba(244,140,37,0.4)] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#f48c25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="flex-1 text-[11px] text-[var(--color-text-2)] font-medium">{ing.name}</p>
                  <span className="text-[10px] font-bold text-[#f48c25]">{ing.weight}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full mt-auto py-3 text-[12px] font-semibold tracking-widest uppercase text-black bg-gradient-to-br from-[#f48c25] to-[#e07010] rounded-lg hover:from-[#ff9d3a] hover:to-[#f48c25] hover:shadow-[0_4px_24px_rgba(244,140,37,0.25)] hover:-translate-y-px transition-all">
            ADD TO DAILY TRACKER
          </button>
        </aside>
      </div>

      <RelatedCarousel slugs={dish.relatedSlugs} />
    </div>
  );
}
