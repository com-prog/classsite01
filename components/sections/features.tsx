import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  FolderOpen,
  GraduationCap,
  Presentation,
  Video,
  type LucideIcon,
} from "lucide-react";

import { siteConfig } from "@/site.config";
import { getItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 강의 자료 섹션 (벤토 그리드).
   - 제목/설명: site.config.ts 의 features
   - 카드 목록: 관리자 페이지(/admin)에서 관리 (Supabase 연결 전에는 예시 카드가 보임)
   - 카드 크기는 6개 단위로 반복: 세로로 긴 칸 → 가로로 긴 칸 → 작은 칸 2개 → 가로로 긴 칸 → 작은 칸 */

const BENTO_LAYOUT = [
  { span: "lg:row-span-2", size: "tall" },
  { span: "sm:col-span-2", size: "wide" },
  { span: "", size: "small" },
  { span: "", size: "small" },
  { span: "sm:col-span-2", size: "wide" },
  { span: "", size: "small" },
] as const;

/* 이미지가 없는 카드에 순서대로 들어가는 아이콘 */
const ICONS: LucideIcon[] = [Presentation, FileText, Video, BookOpen, FolderOpen, GraduationCap];

/* 그림 칸 배경색 — 카드마다 분홍 → 파랑 → 노랑 → 초록 순서로 돌아감 (globals.css 의 --tile-*) */
const TILE_COLORS = ["bg-tile-pink", "bg-tile-blue", "bg-tile-yellow", "bg-tile-green"];

export async function Features() {
  const { features } = siteConfig;
  const items = await getItems("features");

  return (
    <section id="features" className="scroll-mt-16 py-24">
      <Container>
        <SectionHeader
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
          className="mx-auto text-center"
        />

        {items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">아직 등록된 자료가 없습니다.</p>
        ) : (
          <div className="mt-14 grid grid-flow-row-dense auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((item, i) => {
              const layout = BENTO_LAYOUT[i % BENTO_LAYOUT.length];
              const Icon = ICONS[i % ICONS.length];
              const isTall = layout.size === "tall";
              const isWide = layout.size === "wide";

              const card = (
                <article
                  className={cn(
                    "group relative flex h-full overflow-hidden glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px] hover:shadow-primary/35 sm:p-7",
                    isWide ? "flex-col sm:flex-row sm:items-center sm:gap-6" : "flex-col"
                  )}
                >
                  <div className={cn("relative z-10", isWide && "sm:flex-1")}>
                    <h3 className="flex items-start justify-between gap-3 font-display text-xl font-bold tracking-tight">
                      {item.title}
                      {item.link_url ? (
                        <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      ) : null}
                    </h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  {/* 그림 자리: 이미지가 있으면 이미지, 없으면 입체 느낌의 아이콘 */}
                  <div
                    className={cn(
                      "relative mt-6 overflow-hidden rounded-2xl",
                      TILE_COLORS[i % TILE_COLORS.length],
                      isTall && "flex-1 min-h-48",
                      isWide && "aspect-[16/9] sm:mt-0 sm:w-2/5 sm:shrink-0",
                      !isTall && !isWide && "mt-auto aspect-[16/9]"
                    )}
                  >
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute size-32 rounded-full bg-card/40 blur-2xl" />
                        <Icon
                          strokeWidth={1.6}
                          className={cn(
                            "relative text-primary drop-shadow-lg drop-shadow-card/60 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
                            isTall ? "size-24" : "size-16"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </article>
              );

              return item.link_url ? (
                <a
                  key={item.id}
                  href={item.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className={layout.span}
                >
                  {card}
                </a>
              ) : (
                <div key={item.id} className={layout.span}>
                  {card}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
