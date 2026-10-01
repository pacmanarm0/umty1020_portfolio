export interface ProfileLinks {
  github: string;
  figma: string;
  email: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  image: string;
  links: ProfileLinks;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  summary: string;
  thumbnail: string;
  images: string[];
}

const slide = (folder: string, index: number) =>
  `/${folder}/slide${String(index).padStart(2, "0")}.png`;

const slideRange = (folder: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => slide(folder, from + i));

export const PROFILE_DATA: Profile = {
  name: "Kurt Donald Cobain",
  tagline: "Product Designer & Frontend Developer",
  bio: "사용자의 문제를 정의하는 것에서 시작해, 디자인 시스템을 설계하고 직접 코드로 구현하는 일을 합니다. 핀테크와 SaaS 도메인에서 5년간 제품을 만들어 왔으며, 디자인과 개발 사이의 간극을 줄여 팀이 더 빠르고 일관되게 움직일 수 있도록 돕는 데 관심이 많습니다.",
  image: "/images/profile.png",
  links: {
    github: "https://github.com/jiwoo-kim",
    figma: "https://www.figma.com/@jiwookim",
    email: "mailto:hello@jiwoo.design",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "flowdesk-analytics",
    title: "Dangsquare",
    category: "반려동물 통합 플랫폼",
    year: 2026,
    summary:
      "B2B 고객사가 매출과 유입 지표를 한눈에 파악할 수 있도록 대시보드를 전면 재설계했습니다. 위젯 기반 레이아웃과 차트 컴포넌트 라이브러리를 구축해 리포트 생성 시간을 62% 단축했습니다.",
    thumbnail: slide("project1", 1),
    // slide10.png is a 112×10 text fragment, not a slide.
    images: slideRange("project1", 2, 9),
  },
  {
    id: "pocket-pay",
    title: "Resilo",
    category: "수출 AI 지능형 공급망 복구 에이전트",
    year: 2026,
    summary:
      "간편 송금과 카드 관리를 하나로 합친 모바일 결제 앱의 0→1 디자인을 리드했습니다. 결제 플로우를 5단계에서 3단계로 줄이고, 출시 3개월 만에 MAU 12만 명을 달성했습니다.",
    thumbnail: slide("project2", 1),
    images: slideRange("project2", 2, 14),
  },
  {
    id: "atlas-design-system",
    title: "ANTRY UX DESIGN",
    category: "2025 UX DESIGN",
    year: 2025,
    summary:
      "4개 제품팀이 함께 쓰는 디자인 시스템을 Figma와 React 컴포넌트로 동시에 구축했습니다. 디자인 토큰 자동화 파이프라인을 도입해 디자인-코드 불일치 이슈를 80% 이상 줄였습니다.",
    thumbnail: slide("project3", 1),
    images: slideRange("project3", 2, 17),
  },
];
