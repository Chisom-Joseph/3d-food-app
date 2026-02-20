'use client';
import Link from 'next/link';
import { FoodItem, foodItems } from '@/lib/foodData';
import styles from './RelatedCarousel.module.css';
import { useRef } from 'react';

interface RelatedCarouselProps {
  slugs: string[];
}

const emojiMap: Record<string, string> = {
  torus: '🍣',
  sphere: '🍔',
  icosahedron: '🥗',
  cylinder: '🥣',
  octahedron: '🐟',
};

export default function RelatedCarousel({ slugs }: RelatedCarouselProps) {
  const related = foodItems.filter((f) => slugs.includes(f.slug));
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <p className={styles.navLabel}>NAVIGATION</p>
          <p className={styles.title}>Related Items</p>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={() => scroll('left')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={styles.arrowBtn} onClick={() => scroll('right')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.carousel} ref={scrollRef}>
        {related.map((item) => (
          <Link key={item.slug} href={`/dish/${item.slug}`} className={styles.card}>
            <div
              className={styles.imgWrap}
              style={{ background: `radial-gradient(circle at 40% 40%, ${item.glowColor}22, ${item.color}11)` }}
            >
              <span style={{ fontSize: 36, filter: `drop-shadow(0 0 10px ${item.glowColor}88)` }}>
                {emojiMap[item.shape] || '🍽️'}
              </span>
            </div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.cal}>{item.calories} kcal</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
