'use client';
import { Vitamin } from '@/lib/foodData';

interface VitaminBarsProps {
  vitamins: Vitamin[];
}

export default function VitaminBars({ vitamins }: VitaminBarsProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <p className="text-[12px] font-bold text-[#f0f0f0]">Vitamins &amp; Minerals</p>
        <p className="text-[9px] font-semibold tracking-widest text-[#666]">% DAILY VALUE</p>
      </div>
      {vitamins.map((v, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <p className="text-[11px] text-[#aaa] w-[90px] flex-shrink-0">{v.name}</p>
          <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f48c25] to-[#ff6b00] rounded-full bar-grow"
              style={{ width: `${v.pct}%`, animationDelay: `${i * 100}ms`, boxShadow: '0 0 8px rgba(244,140,37,0.5)' }}
            />
          </div>
          <p className="text-[10px] font-bold text-[#f48c25] w-7 text-right flex-shrink-0">{v.pct}%</p>
        </div>
      ))}
    </div>
  );
}
