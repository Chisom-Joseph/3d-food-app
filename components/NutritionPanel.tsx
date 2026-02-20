'use client';
import Link from 'next/link';
import { FoodItem } from '@/lib/foodData';
import MacroCircle from './MacroCircle';
import styles from './NutritionPanel.module.css';

interface NutritionPanelProps {
  dish: FoodItem;
}

export default function NutritionPanel({ dish }: NutritionPanelProps) {
  return (
    <aside className={styles.panel}>
      {/* Calories */}
      <div className={styles.calories}>
        <p className={styles.calLabel}>TOTAL CALORIES</p>
        <div className={styles.calValue}>
          <span className={styles.calNum}>{dish.calories}</span>
          <span className={styles.calUnit}>KCAL</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Macros */}
      <div className={styles.macroRow}>
        <MacroCircle label="PROTEIN" value={dish.macros.protein.g} pct={dish.macros.protein.pct} color="#f48c25" size={64} />
        <MacroCircle label="CARBS" value={dish.macros.carbs.g} pct={dish.macros.carbs.pct} color="#4da6ff" size={64} />
        <MacroCircle label="FATS" value={dish.macros.fats.g} pct={dish.macros.fats.pct} color="#51cf66" size={64} />
      </div>

      <div className={styles.macroLabels}>
        <div>
          <p className={styles.macroG}>{dish.macros.protein.g}g</p>
          <p className={styles.macroL}>PROTEIN</p>
        </div>
        <div>
          <p className={styles.macroG}>{dish.macros.carbs.g}g</p>
          <p className={styles.macroL}>CARBS</p>
        </div>
        <div>
          <p className={styles.macroG}>{dish.macros.fats.g}g</p>
          <p className={styles.macroL}>FATS</p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Ingredients */}
      <div className={styles.ingrHeader}>
        <p className={styles.sectionLabel}>INGREDIENTS</p>
        <button className={styles.viewAll}>View All</button>
      </div>

      <div className={styles.ingrList}>
        {dish.ingredients.slice(0, 3).map((ing, i) => (
          <div key={i} className={styles.ingrItem}>
            <span className={styles.ingrIcon}>{ing.icon}</span>
            <div className={styles.ingrInfo}>
              <p className={styles.ingrName}>{ing.name}</p>
              <p className={styles.ingrSub}>{ing.subtitle}</p>
            </div>
            <span className={styles.ingrWeight}>{ing.weight}</span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* CTAs */}
      <div className={styles.ctas}>
        <button className={`btn btn-primary ${styles.addBtn}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ADD TO BASKET — {dish.price}
        </button>
        <Link href={`/dish/${dish.slug}`} className={`btn btn-outline ${styles.shareBtn}`}>
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
