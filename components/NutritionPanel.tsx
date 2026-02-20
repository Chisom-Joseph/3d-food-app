'use client';
import Link from 'next/link';
import { FoodItem } from '@/lib/foodData';
import MacroCircle from './MacroCircle';

interface NutritionPanelProps {
  dish: FoodItem;
}

export default function NutritionPanel({ dish }: NutritionPanelProps) {
  return (
    <aside className="w-[240px] flex-shrink-0 flex flex-col gap-3.5 p-4 bg-[#141414] border-l border-white/[0.07] overflow-y-auto">
      {/* Calories */}
      <div className="text-center">
        <p className="text-[9px] font-bold tracking-[0.15em] text-[#666] mb-1">TOTAL CALORIES</p>
        <div className="flex items-start justify-center gap-1">
          <span className="text-[52px] font-bold text-[#f0f0f0] leading-none">{dish.calories}</span>
          <span className="text-[12px] font-bold text-[#f48c25] mt-1.5 tracking-widest">KCAL</span>
        </div>
      </div>

      <div className="w-full h-px bg-white/[0.07]" />

      {/* Macro circles */}
      <div className="flex justify-around items-center">
        <MacroCircle label="PROTEIN" value={dish.macros.protein.g} pct={dish.macros.protein.pct} color="#f48c25" size={64} />
        <MacroCircle label="CARBS"   value={dish.macros.carbs.g}   pct={dish.macros.carbs.pct}   color="#4da6ff" size={64} />
        <MacroCircle label="FATS"    value={dish.macros.fats.g}    pct={dish.macros.fats.pct}    color="#51cf66" size={64} />
      </div>
      <div className="flex justify-around text-center">
        {[
          { g: dish.macros.protein.g, label: 'PROTEIN' },
          { g: dish.macros.carbs.g,   label: 'CARBS' },
          { g: dish.macros.fats.g,    label: 'FATS' },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-[13px] font-bold text-[#f0f0f0]">{m.g}g</p>
            <p className="text-[9px] font-semibold tracking-widest text-[#666]">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-white/[0.07]" />

      {/* Ingredients */}
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold tracking-[0.12em] text-[#666]">INGREDIENTS</p>
        <button className="text-[10px] text-[#f48c25] font-semibold bg-none border-none cursor-pointer hover:opacity-70 transition-opacity">View All</button>
      </div>

      <div className="flex flex-col gap-2.5">
        {dish.ingredients.slice(0, 3).map((ing, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] border border-white/[0.07] rounded-lg flex-shrink-0 text-lg">
              {ing.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-[#f0f0f0] truncate">{ing.name}</p>
              <p className="text-[9px] text-[#666] truncate">{ing.subtitle}</p>
            </div>
            <span className="text-[10px] font-bold text-[#f48c25] flex-shrink-0">{ing.weight}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-white/[0.07]" />

      {/* CTAs */}
      <div className="flex flex-col gap-2 mt-auto">
        <button className="w-full flex items-center justify-center gap-2 px-3 py-[11px] text-[11px] font-semibold tracking-widest uppercase text-black bg-gradient-to-br from-[#f48c25] to-[#e07010] rounded-lg hover:from-[#ff9d3a] hover:to-[#f48c25] hover:shadow-[0_4px_24px_rgba(244,140,37,0.25)] hover:-translate-y-px transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ADD TO BASKET — {dish.price}
        </button>
        <Link
          href={`/dish/${dish.slug}`}
          className="w-full flex items-center justify-center gap-2 px-3 py-[11px] text-[11px] font-semibold tracking-widest uppercase text-[#aaa] bg-transparent border border-white/[0.07] rounded-lg hover:border-[#f48c25] hover:text-[#f48c25] hover:bg-[rgba(244,140,37,0.08)] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2"/>
          </svg>
          EXPLORE FULL DETAIL
        </Link>
      </div>
    </aside>
  );
}
