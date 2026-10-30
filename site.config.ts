/* ==========================================================================
   ★ 사이트 내용 설정 파일
   --------------------------------------------------------------------------
   사이트에 보이는 글자(이름, 소개, 메뉴, 연락처 등)는 대부분 여기에 있습니다.
   따옴표 " " 안의 글자만 바꾸고 저장하면 화면에 바로 반영됩니다.
   (따옴표, 쉼표, 중괄호 { } 는 지우지 않도록 조심!)
   ========================================================================== */

import type { Item } from "@/lib/types";

export const siteConfig = {
  /* 브라우저 탭 제목과 검색 결과에 보이는 정보 */
  name: "Class Archive",
  title: "Class Archive — 강의 자료실",
  description: "강의 슬라이드, 실습 파일, 참고 링크를 한곳에 모아 어디서든 꺼내 쓰는 자료실입니다.",

  /* 상단 메뉴 (href 의 #이름 은 아래 섹션의 id 와 같아야 해당 위치로 이동) */
  nav: [
    { label: "강의 자료", href: "#features" },
    { label: "이용 방법", href: "#about" },
    { label: "문의", href: "#contact" },
  ],

  /* 상단 메뉴 맨 오른쪽 버튼 (누르면 새 탭에서 관리자 페이지가 열림) */
  secretButton: { label: "비밀버튼", href: "/admin" },

  /* 첫 화면(히어로) */
  hero: {
    eyebrow: "Lecture Archive",
    title: "Class Archive\n강의 자료를 한곳에",
    description:
      "수업 슬라이드, 실습 파일, 참고 링크를 주제별로 모아 두었어요. 강의실에서도, 집에서도 바로 찾아 쓰세요.",
    primaryCta: { label: "자료 둘러보기", href: "#features" },
    secondaryCta: { label: "이용 방법", href: "#about" },
  },

  /* 이용 방법 섹션 — 문장 하나가 번호 카드 하나가 됩니다 */
  about: {
    eyebrow: "How to use",
    title: "이렇게 쓰세요",
    paragraphs: [
      "필요한 강의 주제를 카드에서 찾아요.",
      "카드를 누르면 슬라이드·실습 파일이 새 탭에서 열려요.",
      "휴대폰, 태블릿, 노트북 어디서든 같은 주소로 들어오면 돼요.",
    ],
  },

  /* 강의 자료 섹션의 제목 — 카드 목록 자체는 관리자 페이지(/admin)에서 관리 */
  features: {
    eyebrow: "Materials",
    title: "강의 자료",
    description: "주제별로 정리된 카드를 눌러 바로 열어 보세요.",
  },

  /* 문의 섹션 */
  contact: {
    eyebrow: "Contact",
    title: "필요한 자료가 있나요?",
    description: "추가했으면 하는 자료나 고칠 내용이 있으면 편하게 알려 주세요.",
    email: "hello@example.com",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },

  /* 맨 아래(푸터) */
  footer: {
    copyright: "© 2026 Class Archive. All rights reserved.",
  },

  /* 관리자 페이지에서 관리할 섹션 목록.
     key  = 데이터베이스에 저장되는 이름(영문 소문자),
     label = 관리자 화면에 보이는 이름.
     예) 포트폴리오라면 { key: "works", label: "작업물" } 을 추가 */
  adminSections: [{ key: "features", label: "강의 자료" }],
};

/* Supabase를 아직 연결하지 않았을 때 대신 보여줄 예시 카드.
   Supabase를 연결하면 이 내용 대신 관리자 페이지에서 등록한 카드가 보입니다. */
export const sampleItems: Item[] = [
  {
    id: "sample-1",
    section: "features",
    title: "수업 슬라이드",
    description: "주차별 강의 슬라이드를 PDF로 모아 두었어요.",
    image_url: null,
    link_url: null,
    sort_order: 1,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-2",
    section: "features",
    title: "실습 파일",
    description: "따라 해 보는 예제 파일과 정답 코드를 내려받을 수 있어요.",
    image_url: null,
    link_url: null,
    sort_order: 2,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-3",
    section: "features",
    title: "강의 영상",
    description: "놓친 수업은 녹화 영상으로 다시 보세요.",
    image_url: null,
    link_url: null,
    sort_order: 3,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-4",
    section: "features",
    title: "읽을거리",
    description: "수업과 함께 보면 좋은 글과 책 목록이에요.",
    image_url: null,
    link_url: null,
    sort_order: 4,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-5",
    section: "features",
    title: "과제 모음",
    description: "주차별 과제 안내와 제출 양식이에요.",
    image_url: null,
    link_url: null,
    sort_order: 5,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-6",
    section: "features",
    title: "참고 링크",
    description: "도구 설치 방법, 공식 문서 등 자주 쓰는 링크예요.",
    image_url: null,
    link_url: null,
    sort_order: 6,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
