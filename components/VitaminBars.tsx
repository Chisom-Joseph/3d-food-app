'use client';
import { Vitamin } from '@/lib/foodData';
import styles from './VitaminBars.module.css';

interface VitaminBarsProps {
  vitamins: Vitamin[];
}

export default function VitaminBars({ vitamins }: VitaminBarsProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.title}>Vitamins & Minerals</p>
        <p className={styles.title2}>% DAILY VALUE</p>
      </div>
      {vitamins.map((v, i) => (
        <div key={i} className={styles.row}>
          <p className={styles.name}>{v.name}</p>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{ width: `${v.pct}%`, animationDelay: `${i * 100}ms` }}
            />
          </div>
          <p className={styles.pct}>{v.pct}%</p>
        </div>
      ))}
    </div>
  );
}
