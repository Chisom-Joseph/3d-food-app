'use client';
import Link from 'next/link';
import { FoodItem } from '@/lib/foodData';
import styles from './MenuGallery.module.css';

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

export default function MenuGallery({ items, selectedSlug, onSelect }: MenuGalleryProps) {
  return (
    <aside className={styles.gallery}>
      <div className={styles.header}>
        <p className={styles.label}>MENU GALLERY</p>
        <p className={styles.sublabel}>Select a dish to explore</p>
      </div>

      <div className={styles.list}>
        {items.map((item) => {
          const isSelected = item.slug === selectedSlug;
          return (
            <button
              key={item.slug}
              className={`${styles.card} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(item.slug)}
            >
              {isSelected && <span className={styles.badge}>{item.tag}</span>}
              {/* Food illustration */}
              <div className={styles.imgWrap} style={{ background: `radial-gradient(circle at 40% 40%, ${item.glowColor}22, ${item.color}11)` }}>
                <FoodEmoji shape={item.shape} color={item.glowColor} />
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{item.name}</p>
                <div className={styles.rating}>
                  <StarIcon />
                  <span>{item.rating}</span>
                </div>
              </div>
            </button>
          );
        })}

        {/* Filter button */}
        <button className={styles.filterBtn}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          FILTER ITEMS
        </button>
      </div>

      {/* View all link */}
      <Link href="#" className={styles.viewAll}>View all dishes →</Link>
    </aside>
  );
}

function FoodEmoji({ shape, color }: { shape: string; color: string }) {
  const emojiMap: Record<string, string> = {
    torus: '🍣',
    sphere: '🍔',
    icosahedron: '🥗',
    cylinder: '🥣',
    octahedron: '🐟',
  };
  return (
    <span style={{ fontSize: 48, filter: `drop-shadow(0 0 12px ${color}88)` }}>
      {emojiMap[shape] || '🍽️'}
    </span>
  );
}
