"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count?: number;
};

function trackClick(id: string) {
  const body = JSON.stringify({ id });
  // 새 탭으로 이동해도 요청이 확실히 전송되도록 sendBeacon을 우선 사용합니다.
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/click", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link, count }: Props) {
  // 클릭 직후 새로고침 없이도 숫자가 바로 오르도록 화면에서 더해 둡니다.
  const [added, setAdded] = useState(0);
  const shown = count !== undefined ? count + added : undefined;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackClick(link.id);
        setAdded((n) => n + 1);
      }}
      className="flex w-full items-center rounded-2xl border-2 border-stone-800 bg-white px-4 py-4 text-stone-900 shadow-[3px_3px_0_0_#292524] transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-[5px_5px_0_0_#292524] active:translate-y-0 active:shadow-none dark:border-stone-200 dark:bg-stone-900 dark:text-stone-100 dark:shadow-[3px_3px_0_0_#e7e5e4] dark:hover:bg-stone-800"
    >
      <span className="w-14 shrink-0" aria-hidden />
      <span className="flex-1 text-center font-semibold">{link.title}</span>
      <span className="w-14 shrink-0 text-right text-xs text-stone-500 dark:text-stone-400">
        {shown !== undefined ? `${shown.toLocaleString()}회` : ""}
      </span>
    </a>
  );
}
