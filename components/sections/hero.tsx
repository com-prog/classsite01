import { BarChart3, FileText, MessageSquareText } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getHeroText } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AnalogClock } from "@/components/ui/analog-clock";

/* 첫 화면(히어로) — '유리 보고서 표지' 느낌.
   - 글자는 관리자 페이지(/admin → 히어로 문구)에서 바꿉니다.
     저장된 게 없으면 site.config.ts 의 hero 글자가 보입니다.
   - 색은 app/globals.css 의 토큰(primary, hero-*, tile-*)을 따릅니다.
   - 21st.dev 의 멋진 히어로로 바꾸고 싶다면: 그 컴포넌트를 components/ui 에 넣고,
     이 파일의 <section> 안쪽을 그 컴포넌트로 감싸면 됩니다. (Claude에게 /add-component 로 요청) */

/** 유리 느낌의 작은 아이콘 타일 (장식) */
function GlassTile({ icon: Icon, className }: { icon: typeof BarChart3; className?: string }) {
  return (
    <div
      aria-hidden
      className={`glass absolute hidden size-20 items-center justify-center rounded-2xl sm:flex lg:size-24 ${className ?? ""}`}
    >
      <Icon strokeWidth={1.8} className="size-9 text-primary lg:size-11" />
    </div>
  );
}

export async function Hero() {
  const { hero } = siteConfig;
  const text = await getHeroText();

  return (
    <section id="top" className="bg-hero relative overflow-hidden p-3 sm:p-6 lg:p-8">
      {/* 배경의 흐릿한 파스텔 빛 덩어리 */}
      <div aria-hidden className="absolute -left-24 top-10 size-80 rounded-full bg-tile-blue/70 blur-3xl" />
      <div aria-hidden className="absolute -right-24 -top-16 size-96 rounded-full bg-tile-pink blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 left-1/3 size-96 rounded-full bg-card/70 blur-3xl" />

      {/* 가운데 유리 판 */}
      <div className="glass relative mx-auto flex min-h-[72svh] max-w-6xl flex-col items-center justify-center overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:px-12 lg:py-24">
        {/* 유리 아이콘 장식 */}
        <GlassTile icon={BarChart3} className="bottom-[14%] left-[7%] -rotate-6" />
        <GlassTile icon={FileText} className="bottom-[6%] left-[16%] rotate-3 !size-16 lg:!size-20" />
        <GlassTile icon={MessageSquareText} className="right-[7%] top-[14%] rotate-6" />

        {/* 오른쪽 아래 아날로그 시계 (넓은 화면에서만) */}
        <AnalogClock className="absolute bottom-10 right-10 hidden w-28 lg:block xl:w-32" />

        <p className="text-xl font-bold tracking-tight text-primary sm:text-2xl lg:text-3xl">
          {text.eyebrow}
        </p>
        <h1 className="mt-3 whitespace-pre-line text-5xl leading-[1.15] text-foreground sm:text-7xl lg:text-8xl">
          {text.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {text.description}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full px-7 font-bold shadow-lg shadow-primary/30">
            <a href={hero.primaryCta.href}>{text.primaryLabel}</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary/30 bg-card/70 px-7 font-bold text-primary hover:bg-secondary hover:text-primary"
          >
            <a href={hero.secondaryCta.href}>{text.secondaryLabel}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
