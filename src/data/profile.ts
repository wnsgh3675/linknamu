export type LinkItem = {
  id: string; // 클릭 수 집계용 고유 ID (변경하면 집계가 새로 시작됩니다)
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string; // public/ 폴더 기준 경로 또는 외부 URL
};

export const profile: Profile = {
  name: "임개발",
  bio: "풀스택 개발자|요즘에는 AI개발에 관심이 많아요",
  image: "https://placehold.co/150x150/orange/white",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://velog.io" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
];
