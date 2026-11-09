import { Suspense } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList, { LinkListWithCounts } from "@/components/LinkList";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-stone-100 px-4 py-10 sm:items-center dark:bg-stone-950">
      <div className="flex w-full max-w-md flex-col items-center gap-10 rounded-[2rem] border-2 border-stone-800 bg-white px-6 py-12 shadow-lg dark:border-stone-700 dark:bg-stone-900">
        <ProfileHeader profile={profile} />
        {/* 링크는 즉시 보이고, 클릭 수는 DB 조회 후 스트리밍됩니다 */}
        <Suspense fallback={<LinkList links={links} />}>
          <LinkListWithCounts links={links} />
        </Suspense>
        <footer className="text-xs text-stone-400">🌳 링크나무</footer>
      </div>
    </main>
  );
}
