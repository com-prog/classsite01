import { sampleItems, siteConfig } from "@/site.config";
import { getPublicClient } from "@/lib/supabase";
import type { Item } from "@/lib/types";

/**
 * 특정 섹션의 카드 목록을 가져옵니다.
 * - Supabase가 연결 안 됐으면: site.config.ts 의 예시 카드를 보여줌
 * - 연결됐으면: 데이터베이스에서 '보이기'로 설정된 카드만 순서대로 가져옴
 */
export async function getItems(section: string): Promise<Item[]> {
  const supabase = getPublicClient();
  const samples = sampleItems.filter((item) => item.section === section);
  if (!supabase) return samples;

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("section", section)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getItems] Supabase 읽기 실패:", error.message);
    return samples;
  }
  return (data ?? []) as Item[];
}

/** 관리자 페이지에서 고칠 수 있는 히어로 문구 목록 (key 는 site_content 표에 'hero.key' 로 저장됨) */
export const heroFields = [
  { key: "eyebrow", label: "작은 윗글씨" },
  { key: "title", label: "큰 제목 (Enter 로 줄바꿈)", multiline: true },
  { key: "description", label: "설명 문장", multiline: true },
  { key: "primaryLabel", label: "첫째 버튼 글자" },
  { key: "secondaryLabel", label: "둘째 버튼 글자" },
] as const;

export type HeroText = Record<(typeof heroFields)[number]["key"], string>;

/**
 * 히어로 문구를 가져옵니다.
 * - 기본값: site.config.ts 의 hero
 * - Supabase 에 저장된 문구가 있으면 그것으로 덮어씀
 */
export async function getHeroText(): Promise<HeroText> {
  const { hero } = siteConfig;
  const text: HeroText = {
    eyebrow: hero.eyebrow,
    title: hero.title,
    description: hero.description,
    primaryLabel: hero.primaryCta.label,
    secondaryLabel: hero.secondaryCta.label,
  };

  const supabase = getPublicClient();
  if (!supabase) return text;

  const { data, error } = await supabase.from("site_content").select("key, value").like("key", "hero.%");
  if (error) {
    console.error("[getHeroText] Supabase 읽기 실패:", error.message);
    return text;
  }

  for (const row of data ?? []) {
    const key = String(row.key).slice("hero.".length);
    if (key in text) text[key as keyof HeroText] = String(row.value);
  }
  return text;
}
