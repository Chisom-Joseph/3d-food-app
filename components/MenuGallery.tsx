'use client';
import Link from 'next/link';
import { FoodItem } from '@/lib/foodData';

interface MenuGalleryProps {
  items: FoodItem[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const emojiMap: Record<string, string> = {
  torus: '🍣', sphere: '🍔', icosahedron: '🥗', cylinder: '🥣', octahedron: '🐟',
};

export default function MenuGallery({ items, selectedSlug, onSelect }: MenuGalleryProps) {
  return (
    <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-border)] overflow-y-auto overflow-x-hidden transition-colors duration-300">
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-bold tracking-[0.12em] text-[var(--color-text-3)]">MENU GALLERY</p>
        <p className="text-[11px] text-[var(--color-text-3)] mt-0.5">Select a dish to explore</p>
      </div>

      <div className="flex flex-col gap-2 p-2 flex-1">
        {items.map((item) => {
          const isSelected = item.slug === selectedSlug;
          return (
            <button
              key={item.slug}
              onClick={() => onSelect(item.slug)}
              className={`relative flex flex-col gap-2 p-3 rounded-lg text-left overflow-hidden transition-all cursor-pointer border ${
                isSelected
                  ? 'border-[#f48c25] bg-[rgba(244,140,37,0.06)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[rgba(244,140,37,0.3)] hover:bg-[var(--color-surface-3)]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 text-[8px] font-black tracking-widest text-black bg-[#f48c25] rounded px-1.5 py-0.5">
                  {item.tag}
                </span>
              )}
              <div
                className="w-full h-[90px] rounded-md flex items-center justify-center transition-transform duration-300 hover:scale-105"
                style={{ background: `radial-gradient(circle at 40% 40%, ${item.glowColor}22, ${item.color}11)` }}
              >
                <span style={{ fontSize: 48, filter: `drop-shadow(0 0 12px ${item.glowColor}88)` }}>
                  {emojiMap[item.shape] || '🍽️'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[var(--color-text)]">{item.name}</p>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-[#f48c25]">
                  <StarIcon />
                  <span>{item.rating}</span>
                </div>
              </div>
            </button>
          );
        })}

        <button className="flex items-center justify-center gap-1.5 w-full py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-3)] text-[10px] font-bold tracking-widest cursor-pointer hover:border-[#f48c25] hover:text-[#f48c25] transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          FILTER ITEMS
        </button>
      </div>

      <Link href="#" className="block text-center py-3 text-[11px] text-[#f48c25] font-medium border-t border-[var(--color-border)] hover:opacity-70 transition-opacity">
        View all dishes →
      </Link>
    </aside>
  );
}
