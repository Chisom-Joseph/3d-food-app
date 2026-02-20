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

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState('sushi-platter');
  const [showAnnotations, setShowAnnotations] = useState(true);

  const dish = getFoodBySlug(selectedSlug) || foodItems[0];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--color-bg)] transition-colors duration-300">
      <Navbar variant="main" />
      <div className="flex flex-1 overflow-hidden min-h-0">
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
