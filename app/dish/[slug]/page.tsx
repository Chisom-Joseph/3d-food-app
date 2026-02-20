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
import styles from './page.module.css';

const FoodViewer3D = dynamic(() => import('@/components/FoodViewer3D'), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, animation: 'float 2s ease infinite' }}>✨</div>
        <p style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: '0.1em', fontWeight: 600, marginTop: 16 }}>LOADING 3D ENGINE...</p>
      </div>
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
    <div className={styles.root}>
      <Navbar variant="detail" />

      <div className={styles.body}>
        {/* Left: 3D viewer + title */}
        <div className={styles.left}>
          <div className={styles.titleArea}>
            <span className="badge badge-accent">{dish.tag}</span>
            <h1 className={styles.dishName}>
              <span className={styles.dishNameLight}>{dish.name.split(' ')[0]} </span>
              <span className={styles.dishNameAccent}>{dish.name.split(' ').slice(1).join(' ').toUpperCase()}</span>
            </h1>
            <div className={styles.meta}>
              <span>🔥 {dish.calories} kcal</span>
              <span>⏱ {dish.prepTime}</span>
            </div>
          </div>

          <div className={styles.viewerWrap}>
            <FoodViewer3D
              dish={dish}
              showAnnotations={true}
              onToggleAnnotations={() => {}}
            />
          </div>
        </div>

        {/* Right: Nutritional data panel */}
        <aside className={styles.right}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Nutritional Data</h2>
            <button className={styles.downloadBtn}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              DOWNLOAD REPORT
            </button>
          </div>

          {/* Macro circles large */}
          <div className={styles.macroRow}>
            {[
              { label: 'PROTEIN', g: dish.macros.protein.g, pct: dish.macros.protein.pct, color: '#f48c25' },
              { label: 'CARBS', g: dish.macros.carbs.g, pct: dish.macros.carbs.pct, color: '#4da6ff' },
              { label: 'FATS', g: dish.macros.fats.g, pct: dish.macros.fats.pct, color: '#51cf66' },
            ].map((m) => (
              <div key={m.label} className={styles.macroItem}>
                <MacroCircle label={m.label} value={m.g} pct={m.pct} color={m.color} size={80} />
                <p className={styles.macroG}>{m.g}g</p>
                <p className={styles.macroL}>{m.label}</p>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          {/* Vitamins */}
          <VitaminBars vitamins={dish.vitamins} />

          <div className={styles.divider} />

          {/* Ingredient anatomy */}
          <div>
            <div className={styles.anatomyHeader}>
              <span className={styles.anatomyIcon}>🍽️</span>
              <h3 className={styles.anatomyTitle}>Ingredients Anatomy</h3>
            </div>
            <div className={styles.anatomyList}>
              {dish.ingredients.map((ing, i) => (
                <div key={i} className={styles.anatomyItem}>
                  <div className={styles.checkCircle}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className={styles.anatomyName}>{ing.name}</p>
                  <span className={styles.anatomyWeight}>{ing.weight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className={`btn btn-primary ${styles.ctaBtn}`}>
            ADD TO DAILY TRACKER
          </button>
        </aside>
      </div>

      {/* Related items carousel */}
      <RelatedCarousel slugs={dish.relatedSlugs} />
    </div>
  );
}
