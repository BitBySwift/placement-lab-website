'use client';

import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer() {
  const { hours, minutes, seconds } = useCountdown();

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[
          { value: pad(hours), label: 'hr' },
          { value: pad(minutes), label: 'min' },
          { value: pad(seconds), label: 'sec' },
        ].map((unit, idx) => (
          <div key={unit.label} className="flex items-center gap-1">
            <div className="glass px-2 py-1 rounded text-center min-w-[36px]">
              <span className="text-white font-bold text-sm tabular-nums">{unit.value}</span>
              <div className="text-gray-500 text-xs">{unit.label}</div>
            </div>
            {idx < 2 && <span className="text-gray-400 font-bold">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
