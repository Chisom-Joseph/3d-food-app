'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  variant?: 'main' | 'detail';
}

export default function Navbar({ variant = 'main' }: NavbarProps) {
  const [searchVal, setSearchVal] = useState('');

  return (
    <header className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>
          {variant === 'main' ? (
            <>GASTRO<span className="gradient-text">3D</span></>
          ) : (
            <>FOOD <span className="gradient-text">EXPLORER</span></>
          )}
        </span>
        {variant === 'detail' && <span className={styles.version}>VERSION 2.5.4</span>}
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className={styles.search}
          placeholder={variant === 'main' ? 'Search Cuisine...' : 'Explore 3D ingredients, recipes, or nutrients...'}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {/* Nav links */}
      <nav className={styles.nav}>
        {variant === 'main' ? (
          <>
            <Link href="/" className={`${styles.navLink} ${styles.active}`}>Explorer</Link>
            <Link href="#" className={styles.navLink}>Collections</Link>
            <Link href="#" className={styles.navLink}>Labs</Link>
          </>
        ) : (
          <>
            <Link href="/" className={`${styles.navLink} ${styles.active}`}>Explorer</Link>
            <Link href="#" className={styles.navLink}>Lab</Link>
            <Link href="#" className={styles.navLink}>Library</Link>
          </>
        )}
      </nav>

      {/* Right icons */}
      <div className={styles.icons}>
        {variant === 'detail' && (
          <button className={styles.iconBtn} aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        <button className={styles.iconBtn} aria-label="Cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="21" r="1" fill="currentColor"/>
            <circle cx="20" cy="21" r="1" fill="currentColor"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className={styles.avatar}>
          <span>C</span>
        </div>
      </div>
    </header>
  );
}
