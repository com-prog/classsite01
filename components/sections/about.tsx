import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/** 이용 방법 섹션 (벤토 카드). 글자는 site.config.ts 의 about 에서 바꿉니다.
    paragraphs 의 문장 하나가 번호 카드 하나가 됩니다. */
export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-16 pb-24">
      <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <div className="flex flex-col justify-center rounded-3xl bg-secondary p-7 md:col-span-2 lg:col-span-1 lg:row-span-1">
          <SectionHeader eyebrow={about.eyebrow} title={about.title} />
        </div>
        {about.paragraphs.map((text, i) => (
          <div
            key={i}
            className="flex flex-col gap-5 rounded-3xl border border-primary/20 bg-card p-7 shadow-[0_10px_30px_-12px] shadow-primary/20"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-highlight font-display text-lg font-bold text-highlight-foreground shadow-lg shadow-highlight/30">
              {i + 1}
            </span>
            <p className="text-base leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
