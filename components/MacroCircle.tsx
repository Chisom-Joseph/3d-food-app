'use client';

interface MacroCircleProps {
  label: string;
  value: number;
  pct: number;
  color: string;
  size?: number;
}

export default function MacroCircle({ label, value, pct, color, size = 64 }: MacroCircleProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const stroke = circumference - (pct / 100) * circumference;
  const center = size / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            cx={center} cy={center} r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={stroke}
            style={{ filter: `drop-shadow(0 0 6px ${color}88)`, transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        {/* Center value */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color, lineHeight: 1 }}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
