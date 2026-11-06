import { Mail } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

/** 연락처 섹션. 이메일과 링크는 site.config.ts 의 contact 에서 바꿉니다. */
export function Contact() {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="scroll-mt-16 pb-24">
      <Container>
        <div className="bg-hero relative overflow-hidden rounded-2xl border border-card px-6 py-16 text-center text-hero-foreground sm:px-12">
          <div
            aria-hidden
            className="bg-dots absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
          />
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
            className="relative mx-auto [&_h2]:text-hero-foreground [&_p]:text-hero-foreground/75 [&_p:first-child]:text-primary"
          />
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-hero-foreground font-semibold text-hero-from hover:bg-hero-foreground/90"
            >
              <a href={`mailto:${contact.email}`}>
                <Mail />
                {contact.email}
              </a>
            </Button>
            {contact.links.map((link) => (
              <Button
                key={link.href}
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40 bg-card/70 text-primary hover:bg-secondary hover:text-primary"
              >
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
