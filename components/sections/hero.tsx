import { Play } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getHeroText } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnalogClock } from "@/components/ui/analog-clock";

/* 첫 화면(히어로) — '말랑말랑 학교 수업 자료' 슬라이드 느낌.
   - 글자는 관리자 페이지(/admin → 히어로 문구)에서 바꿉니다.
     저장된 게 없으면 site.config.ts 의 hero 글자가 보입니다.
   - 작은 윗글씨는 한 글자씩 분홍 → 파랑 → 노랑 → 초록 순서로 색이 바뀝니다.
   - 21st.dev 의 멋진 히어로로 바꾸고 싶다면: 그 컴포넌트를 components/ui 에 넣고,
     이 파일의 <section> 안쪽을 그 컴포넌트로 감싸면 됩니다. (Claude에게 /add-component 로 요청) */

const LETTER_COLORS = ["text-tile-pink", "text-tile-blue", "text-tile-yellow", "text-tile-green"];

/** 손으로 그린 듯한 꼬불꼬불 선 장식 */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" fill="none" aria-hidden className={className}>
      <path
        d="M4 32 C 10 6, 30 4, 28 24 S 12 44, 26 44 S 52 34, 56 18"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-current"
      />
    </svg>
  );
}

export async function Hero() {
  const { hero } = siteConfig;
  const text = await getHeroText();

  // 띄어쓰기는 색 순서에서 빼고, 글자마다 색을 돌려 가며 칠함
  let colorIndex = 0;
  const letters = Array.from(text.eyebrow).map((char, i) => {
    if (char.trim() === "") return <span key={i}>{char}</span>;
    const color = LETTER_COLORS[colorIndex++ % LETTER_COLORS.length];
    return (
      <span key={i} className={cn(color, "brightness-95 saturate-150")}>
        {char}
      </span>
    );
  });

  return (
    <section id="top" className="bg-hero relative overflow-hidden p-3 sm:p-6 lg:p-8">
      {/* 네 모서리의 파스텔 덩어리 장식 */}
      <div
        aria-hidden
        className="absolute -left-16 -top-20 size-64 rounded-[42%_58%_63%_37%/45%_40%_60%_55%] bg-tile-pink sm:size-96"
      />
      <div aria-hidden className="absolute -right-10 -top-8 flex sm:-right-4">
        <span className="size-24 rounded-full bg-tile-blue sm:size-36" />
        <span className="-ml-10 mt-14 size-20 rounded-full bg-tile-blue sm:size-28" />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-16 -left-12 size-56 rounded-[60%_40%_45%_55%/55%_60%_40%_45%] bg-tile-green sm:size-80"
      />
      <div aria-hidden className="absolute -bottom-10 -right-10 flex items-end sm:-bottom-6">
        <span className="-mr-12 mb-16 size-24 rounded-full bg-tile-yellow sm:size-32" />
        <span className="size-44 rounded-[50%_50%_40%_60%/60%_50%_50%_40%] bg-tile-yellow sm:size-64" />
      </div>

      {/* 가운데 흰 종이 */}
      <div className="relative mx-auto flex min-h-[72svh] max-w-6xl flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-card px-6 py-20 text-center shadow-[0_0_0_6px] shadow-card/60 sm:px-12 lg:py-24">
        {/* 종이 위 낙서 장식 */}
        <Squiggle className="absolute left-[12%] top-[18%] hidden w-14 -rotate-12 text-tile-pink sm:block" />
        <Squiggle className="absolute bottom-[22%] right-[12%] hidden w-16 rotate-12 text-tile-green sm:block" />
        <span aria-hidden className="absolute right-[18%] top-[62%] hidden size-7 rounded-full bg-tile-green sm:block" />
        <span aria-hidden className="absolute left-[8%] top-[48%] hidden size-4 rounded-full bg-tile-blue sm:block" />

        {/* 오른쪽 위 아날로그 시계 (넓은 화면에서만) */}
        <AnalogClock className="absolute right-8 top-8 hidden w-32 rotate-6 lg:block xl:w-36" />

        <p className="font-display text-4xl leading-none sm:text-5xl lg:text-6xl">{letters}</p>
        <h1 className="mt-4 whitespace-pre-line font-display text-5xl leading-[1.15] text-foreground sm:text-7xl lg:text-8xl">
          {text.title}
        </h1>

        {/* 분홍 알약 설명 + 재생 버튼 */}
        <a
          href={hero.primaryCta.href}
          className="group mt-10 flex max-w-2xl items-center gap-4 rounded-[2rem] bg-highlight py-3 pl-7 pr-3 text-left text-base text-highlight-foreground transition-transform hover:-translate-y-0.5 sm:text-xl"
        >
          <span className="flex-1">{text.description}</span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm transition-transform group-hover:scale-110 sm:size-11">
            <Play className="size-4 fill-current" />
          </span>
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="font-display text-lg">
            <a href={hero.primaryCta.href}>{text.primaryLabel}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-display text-lg">
            <a href={hero.secondaryCta.href}>{text.secondaryLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
