"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** 유리 느낌의 아날로그 시계. 지금 시간을 1초마다 다시 그립니다.
    색은 디자인 토큰(primary, hero-*)을 따릅니다. */
export function AnalogClock({ className }: { className?: string }) {
  // 서버와 브라우저의 시간이 달라 생기는 오류를 막으려고, 화면에 붙은 뒤부터 시간을 표시
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const timer = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, []);

  const seconds = now ? now.getSeconds() : 0;
  const minutes = now ? now.getMinutes() + seconds / 60 : 10;
  const hours = now ? (now.getHours() % 12) + minutes / 60 : 10;

  return (
    <div
      role="img"
      aria-label={now ? `현재 시각 ${now.getHours()}시 ${now.getMinutes()}분` : "시계"}
      className={cn(
        "relative aspect-square rounded-full bg-tile-blue p-2.5 shadow-xl shadow-tile-blue/50",
        className
      )}
    >
      <svg viewBox="0 0 200 200" className="size-full">
        {/* 시계판 */}
        <circle cx="100" cy="100" r="96" className="fill-card" />
        <circle cx="100" cy="100" r="96" className="fill-none stroke-accent" strokeWidth="4" />

        {/* 눈금: 정각(굵게) 12개 + 분 눈금 */}
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          return (
            <line
              key={i}
              x1="100"
              y1={major ? 14 : 16}
              x2="100"
              y2={major ? 28 : 21}
              strokeWidth={major ? 4 : 1.5}
              strokeLinecap="round"
              className={major ? "stroke-primary" : "stroke-accent"}
              transform={`rotate(${i * 6} 100 100)`}
            />
          );
        })}

        {/* 숫자 12, 3, 6, 9 */}
        {[
          { n: 12, x: 100, y: 46 },
          { n: 3, x: 158, y: 106 },
          { n: 6, x: 100, y: 166 },
          { n: 9, x: 42, y: 106 },
        ].map(({ n, x, y }) => (
          <text
            key={n}
            x={x}
            y={y}
            textAnchor="middle"
            className="fill-foreground font-display text-[20px]"
          >
            {n}
          </text>
        ))}

        {/* 시침 */}
        <line
          x1="100"
          y1="108"
          x2="100"
          y2="58"
          strokeWidth="7"
          strokeLinecap="round"
          className="stroke-foreground"
          transform={`rotate(${hours * 30} 100 100)`}
        />
        {/* 분침 */}
        <line
          x1="100"
          y1="112"
          x2="100"
          y2="38"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="stroke-muted-foreground"
          transform={`rotate(${minutes * 6} 100 100)`}
        />
        {/* 초침 */}
        <g
          transform={`rotate(${seconds * 6} 100 100)`}
          className={cn(now ? "opacity-100" : "opacity-0")}
        >
          <line x1="100" y1="120" x2="100" y2="30" strokeWidth="2" strokeLinecap="round" className="stroke-primary" />
          <circle cx="100" cy="30" r="4" className="fill-primary" />
        </g>
        <circle cx="100" cy="100" r="7" className="fill-primary" />
        <circle cx="100" cy="100" r="3" className="fill-card" />
      </svg>
    </div>
  );
}
