'use client';
import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sparkles, Stars, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { FoodItem } from '@/lib/foodData';
import { useTheme } from './ThemeProvider';

interface FoodViewer3DProps {
  dish: FoodItem;
  showAnnotations: boolean;
  onToggleAnnotations: () => void;
  compactMode?: boolean;
}

/* Syncs the renderer clear color when the theme changes */
function CanvasBackground({ color }: { color: string }) {
  const { gl, scene } = useThree();
  useEffect(() => {
    const c = new THREE.Color(color);
    gl.setClearColor(c);
    scene.background = c;
    scene.fog = new THREE.Fog(c, 10, 22);
  }, [color, gl, scene]);
  return null;
}

/* Loads a custom .glb scan and auto-scales/centers it to fit the generic viewer space */
function CustomGltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  const copiedScene = useMemo(() => {
    // Clone the scene so we don't mutate the cached singleton from useGLTF
    const clone = scene.clone();
    
    // Compute bounding box to find the object's center and size
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    // Center the model relative to its own bounding box
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;
    
    // Scale so its max dimension is approximately 2.2 units (which fits nicely in our view)
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.2 / maxDim;
    clone.scale.set(scale, scale, scale);

    // Enable shadows for all meshes inside the GLTF
    clone.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    
    return clone;
  }, [scene]);

  return <primitive object={copiedScene} />;
}

function DishMesh({ dish, exploded, autoSpin }: { dish: FoodItem; exploded: boolean; autoSpin: boolean }) {
  const meshRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (autoSpin) meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.1;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.25;
    if (innerRef.current) innerRef.current.rotation.y += delta * 0.8;
  });

  const mainColor = new THREE.Color(dish.color);
  const glowColor = new THREE.Color(dish.glowColor);

  const shapeGeometry = () => {
    switch (dish.shape) {
      case 'torus':       return <torusGeometry args={[1, 0.38, 16, 80]} />;
      case 'sphere':      return <sphereGeometry args={[1.2, 48, 48]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1.15, 1]} />;
      case 'cylinder':    return <cylinderGeometry args={[0.75, 1, 1.5, 32]} />;
      case 'octahedron':  return <octahedronGeometry args={[1.2, 0]} />;
      default:            return <sphereGeometry args={[1.1, 32, 32]} />;
    }
  };

  return (
    <group>
      <mesh position={[0, -1.7, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2, 0.06, 64]} />
        <meshStandardMaterial color="#c0b8b0" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh ref={ringRef} position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.05, 8, 80]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2.5} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 8, 80]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={1.5} transparent opacity={0.4} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <group ref={meshRef} position={[0, exploded ? 0.4 : 0, 0]}>
          {dish.modelUrl ? (
            <CustomGltfModel url={dish.modelUrl} />
          ) : (
            <mesh castShadow>
              {shapeGeometry()}
              <MeshDistortMaterial color={mainColor} metalness={0.25} roughness={0.15} distort={exploded ? 0.55 : 0.12} speed={1.8} />
            </mesh>
          )}
        </group>
      </Float>
      {/* <mesh ref={innerRef} position={[0, exploded ? -0.5 : 0, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={4} transparent opacity={0.7} />
      </mesh> */}
      {exploded && [
        [1.6, 0.7, 0.2], [-1.5, 0.5, 0.5], [0.4, 1.6, -0.8], [-0.9,-0.4, 1.3], [1.1,-0.8,-1.0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.12 + i * 0.02, 12, 12]} />
          <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={3} transparent opacity={0.8} />
        </mesh>
      ))}
      <Sparkles count={50} scale={4.5} size={1.8} speed={0.3} color={dish.glowColor} opacity={0.5} />
    </group>
  );
}

function SceneLights({ dish, isDark }: { dish: FoodItem; isDark: boolean }) {
  return (
    <>
      {/* More ambient light in light mode so the model doesn't look washed out */}
      <ambientLight intensity={isDark ? 0.25 : 0.65} color={isDark ? '#ffffff' : '#fff8f0'} />
      <pointLight position={[4, 6, 4]} intensity={isDark ? 1.8 : 1.2} color={dish.glowColor} castShadow />
      <pointLight position={[-5, -2, -4]} intensity={isDark ? 0.6 : 0.2} color={isDark ? '#2233aa' : '#8899dd'} />
      <pointLight position={[0, -3, 5]} intensity={0.4} color={dish.glowColor} />
      <spotLight position={[0, 8, 2]} angle={0.35} intensity={isDark ? 2.5 : 1.5} castShadow penumbra={0.5} color={dish.glowColor} />
      <directionalLight position={[-4, 4, -4]} intensity={isDark ? 0.3 : 0.5} color={isDark ? '#4455ff' : '#ffe8cc'} />
    </>
  );
}

/* Icon-only on mobile, icon+label on desktop */
function CtrlBtn({ onClick, active, children, label, title }: {
  onClick?: () => void; active?: boolean; children: React.ReactNode; label?: string; title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title ?? label}
      className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide border transition-all cursor-pointer ${
        active
          ? 'border-[#f48c25] text-[#f48c25] bg-[rgba(244,140,37,0.15)]'
          : 'border-[var(--color-border)] text-[var(--color-text-2)] bg-[var(--color-surface-2)] hover:border-[#f48c25] hover:text-[#f48c25] hover:bg-[rgba(244,140,37,0.08)]'
      }`}
    >
      {children}
      {label && <span className="hidden md:inline">{label}</span>}
    </button>
  );
}

export default function FoodViewer3D({ dish, showAnnotations, onToggleAnnotations, compactMode = false }: FoodViewer3DProps) {
  const [exploded, setExploded] = useState(false);
  const [autoSpin, setAutoSpin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme-specific canvas colors
  const canvasBg    = isDark ? '#0a0a0a' : '#f0e8de';
  const annotBg    = isDark ? 'rgba(10,10,10,0.88)'   : 'rgba(255,252,246,0.92)';
  const annotBorder = isDark ? 'rgba(244,140,37,0.4)' : 'rgba(244,140,37,0.5)';
  const annotText   = isDark ? '#aaa' : '#555';
  const annotTitle  = isDark ? '#ffffff' : '#1a1a1a';

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setExploded(false); setAutoSpin(false); }, [dish.slug]);

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ background: canvasBg }}>
        <div className="text-[56px] animate-float">🍽️</div>
        <p className="text-[13px] font-bold tracking-[0.15em] text-[#f48c25]">LOADING 3D ENGINE...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Canvas — background controlled by theme */}
      <div className="flex-1 relative overflow-hidden" style={{ background: canvasBg }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          {/* CanvasBackground syncs renderer clear color & fog reactively */}
          <CanvasBackground color={canvasBg} />
          <SceneLights dish={dish} isDark={isDark} />

          {/* Stars only in dark mode */}
          {isDark && <Stars radius={30} depth={30} count={300} factor={3} saturation={0} fade speed={0.3} />}

          {/* In light mode add a soft haze ring as ambient depth cue */}
          {!isDark && (
            <mesh position={[0, -1.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[3, 64]} />
              <meshStandardMaterial color="#e8d5c0" transparent opacity={0.35} />
            </mesh>
          )}

          <Suspense fallback={null}>
            <DishMesh dish={dish} exploded={exploded} autoSpin={autoSpin} />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={3} maxDistance={8} enableDamping dampingFactor={0.06} />
        </Canvas>

        {/* Annotations */}
        {showAnnotations && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute flex items-center gap-1.5" style={{ top: '28%', left: '4%' }}>
              <div className="w-2 h-2 rounded-full bg-[#f48c25] flex-shrink-0 pulse-glow" />
              <div className="w-6 h-px bg-gradient-to-r from-[#f48c25] to-transparent" />
              <div className="backdrop-blur-sm rounded-md px-2 py-1.5 border transition-colors duration-300"
                style={{ background: annotBg, borderColor: annotBorder }}>
                <p className="text-[9px] md:text-[10px] font-bold text-[#f48c25] mb-0.5">{dish.ingredients[0]?.name}</p>
                <p className="text-[8px] md:text-[9px] hidden sm:block" style={{ color: annotText }}>{dish.ingredients[0]?.subtitle}</p>
              </div>
            </div>
            <div className="absolute flex flex-row-reverse items-center gap-1.5" style={{ top: '55%', right: '4%' }}>
              <div className="w-2 h-2 rounded-full bg-[#f48c25] flex-shrink-0 pulse-glow" />
              <div className="w-6 h-px bg-gradient-to-l from-[#f48c25] to-transparent" />
              <div className="backdrop-blur-sm rounded-md px-2 py-1.5 border transition-colors duration-300"
                style={{ background: annotBg, borderColor: annotBorder }}>
                <p className="text-[9px] md:text-[10px] font-bold text-[#f48c25] mb-0.5">{dish.ingredients[1]?.name}</p>
                <p className="text-[8px] md:text-[9px] hidden sm:block" style={{ color: annotText }}>{dish.ingredients[1]?.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Active ingredient popup - hide in compact mode or when annotations are toggled off */}
        {!compactMode && showAnnotations && (
          <div
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 backdrop-blur-xl rounded-lg px-3 md:px-4 py-2 md:py-3 max-w-[260px] md:max-w-[280px] w-[calc(100%-32px)] text-center border transition-colors duration-300 pointer-events-none"
            style={{ background: annotBg, borderColor: annotBorder }}
          >
            <span className="text-[8px] md:text-[9px] font-bold tracking-[0.12em] text-[#f48c25] block mb-0.5">ACTIVE INGREDIENT</span>
            <h3 className="text-[12px] md:text-[13px] font-bold mb-0.5 md:mb-1 transition-colors duration-300" style={{ color: annotTitle }}>
              {dish.activeIngredient.name}
            </h3>
            <p className="text-[10px] md:text-[11px] leading-relaxed hidden sm:block transition-colors duration-300" style={{ color: annotText }}>
              {dish.activeIngredient.description}
            </p>
          </div>
        )}
      </div>

      {/* Controls strip */}
      <div className="flex items-center justify-between px-2 md:px-4 py-1.5 md:py-2 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex-shrink-0 gap-1 md:gap-2 overflow-x-auto transition-colors duration-300" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
          <CtrlBtn title="Zoom In">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </CtrlBtn>
          <CtrlBtn title="Zoom Out">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </CtrlBtn>
          <CtrlBtn onClick={() => setAutoSpin(s => !s)} active={autoSpin} label="AUTO SPIN">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: autoSpin ? 'spin 1.2s linear infinite' : 'none' }}>
              <path d="M21 12a9 9 0 11-6.219-8.56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M21 3v9h-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </CtrlBtn>
          <CtrlBtn onClick={() => setExploded(e => !e)} active={exploded} label="EXPLODE">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M19.07 4.93l-4.24 4.24M9.17 14.83l-4.24 4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </CtrlBtn>
          <CtrlBtn title="Reset view">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </CtrlBtn>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
          <CtrlBtn onClick={onToggleAnnotations} label="ANNOTATIONS">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </CtrlBtn>
          <CtrlBtn title="Fullscreen">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </CtrlBtn>
        </div>
      </div>

      {/* Footer metadata — hidden on mobile */}
      <div className="hidden md:flex items-center gap-4 px-4 py-1.5 bg-[var(--color-bg-2)] border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-3)] tracking-wide flex-shrink-0 transition-colors duration-300">
        <span>⬡ Engine: WebGL 2.0 RENDERING</span>
        <span>Poly Count: 42.4k</span>
        <span>Texture: 4K PBR</span>
        <span className="ml-auto">SERVER: GLOBAL.EDGE.01</span>
        <span className="text-[#f48c25] font-bold">V1.0.4-BETA</span>
      </div>
    </div>
  );
}
