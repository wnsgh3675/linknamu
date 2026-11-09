# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고 하나의 URL로 공유하는 서비스입니다.

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # MongoDB Atlas 연결 문자열 입력
npm run dev                         # http://localhost:3000
```

## 내 정보로 바꾸기

- 프로필, 링크 목록: `src/data/profile.ts`
- 프로필 사진: `public/`에 이미지를 넣고 `profile.image` 경로를 수정

## 구조

| 경로 | 역할 |
| --- | --- |
| `src/components/ProfileHeader.tsx` | 프로필 사진, 이름, 소개 |
| `src/components/LinkCard.tsx` | 링크 카드 (클릭 시 집계 요청) |
| `src/components/LinkList.tsx` | 링크 목록 + 클릭 수 조회 |
| `src/app/api/click/route.ts` | 클릭 수 증가 API (`POST { id }`) |
| `src/lib/mongodb.ts`, `src/lib/clicks.ts` | MongoDB 연결 및 집계 |

## 배포 (Vercel)

Vercel 프로젝트 설정의 Environment Variables에 `MONGODB_URI`와 `MONGODB_DB`를 등록하세요.
MongoDB Atlas의 Network Access에서 `0.0.0.0/0`을 허용해야 Vercel에서 접속할 수 있습니다.
