'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import MenuGallery from '@/components/MenuGallery';
import NutritionPanel from '@/components/NutritionPanel';
import { foodItems, mainGalleryItems, getFoodBySlug } from '@/lib/foodData';
import styles from './page.module.css';

// Dynamically import 3D viewer to avoid SSR issues
const FoodViewer3D = dynamic(() => import('@/components/FoodViewer3D'), {
  ssr: false,
  loading: () => (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16, animation: 'float 2s ease infinite' }}>🍽️</div>
        <p style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: '0.1em', fontWeight: 600 }}>LOADING 3D ENGINE...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState('sushi-platter');
  const [showAnnotations, setShowAnnotations] = useState(true);

  const dish = getFoodBySlug(selectedSlug) || foodItems[0];

  return (
    <div className={styles.root}>
      <Navbar variant="main" />
      <div className={styles.body}>
        <MenuGallery
          items={mainGalleryItems}
          selectedSlug={selectedSlug}
          onSelect={setSelectedSlug}
        />
        <FoodViewer3D
          dish={dish}
          showAnnotations={showAnnotations}
          onToggleAnnotations={() => setShowAnnotations((v) => !v)}
        />
        <NutritionPanel dish={dish} />
      </div>
    </div>
  );
}
