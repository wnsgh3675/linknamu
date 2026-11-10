import { connection } from "next/server";
import type { LinkItem } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";
import LinkCard from "./LinkCard";

type Props = {
  links: LinkItem[];
  counts?: Record<string, number>;
};

export default function LinkList({ links, counts }: Props) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts ? (counts[link.id] ?? 0) : undefined} />
        </li>
      ))}
    </ul>
  );
}

// 요청 시점에 DB에서 클릭 수를 읽어 함께 표시합니다. (page에서 Suspense로 감싸서 사용)
export async function LinkListWithCounts({ links }: { links: LinkItem[] }) {
  await connection();
  const counts = await getClickCounts();
  const hasData = Object.keys(counts).length > 0;
  return <LinkList links={links} counts={hasData ? counts : undefined} />;
}
