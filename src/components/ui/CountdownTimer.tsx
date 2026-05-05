'use client';
import { useState, useEffect } from 'react';

const TIMER_KEY = 'pl_timer_end';
// 24-hour countdown per session: starts fresh each day. When the countdown expires,
// getEndTime() sets a new 24-hour window so urgency persists for returning visitors.
const DURATION_MS = 24 * 60 * 60 * 1000;

function getEndTime(): number {
  if (typeof window === 'undefined') return Date.now() + DURATION_MS;
  const stored = localStorage.getItem(TIMER_KEY);
  if (stored) {
    const end = parseInt(stored, 10);
    if (end > Date.now()) return end;
  }
  const end = Date.now() + DURATION_MS;
  localStorage.setItem(TIMER_KEY, String(end));
  return end;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ h: 23, m: 59, s: 59 });
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    const endTime = getEndTime();

    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ h, m, s });
      setUrgent(diff < 3600000);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg glass-effect ${urgent ? 'border-red-500/50 text-red-400' : 'border-white/20 text-orange-400'}`}>
      <span className="text-sm font-medium">⏰ Limited Time:</span>
      <span className="font-mono font-bold text-lg">
        {fmt(timeLeft.h)}:{fmt(timeLeft.m)}:{fmt(timeLeft.s)}
      </span>
    </div>
  );
}
