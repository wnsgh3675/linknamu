import { Suspense } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList, { LinkListWithCounts } from "@/components/LinkList";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 pt-20 pb-12 sm:items-center sm:py-24">
      <div className="flex w-full max-w-sm flex-col items-center gap-12">
        <ProfileHeader profile={profile} />
        {/* 링크는 즉시 보이고, 클릭 수는 DB 조회 후 스트리밍됩니다 */}
        <Suspense fallback={<LinkList links={links} />}>
          <LinkListWithCounts links={links} />
        </Suspense>
        <footer className="text-xs tracking-wide text-stone-400 dark:text-stone-500">
          🌳 링크나무
        </footer>
      </div>
    </main>
  );
}
