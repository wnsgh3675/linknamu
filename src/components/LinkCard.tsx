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
      className="flex w-full items-center rounded-3xl border border-white/70 bg-white/45 px-5 py-4 text-stone-800 shadow-[0_1px_2px_rgba(120,72,40,0.05),0_10px_30px_-14px_rgba(120,72,40,0.3)] backdrop-blur-xl transition duration-300 ease-out outline-none hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_1px_2px_rgba(120,72,40,0.06),0_14px_34px_-14px_rgba(120,72,40,0.38)] focus-visible:ring-2 focus-visible:ring-orange-300/70 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)] dark:hover:bg-white/10"
    >
      <span className="w-12 shrink-0" aria-hidden />
      <span className="flex-1 text-center text-[15px] font-semibold">{link.title}</span>
      <span className="w-12 shrink-0 text-right text-xs text-stone-400 tabular-nums dark:text-stone-500">
        {shown !== undefined ? `${shown.toLocaleString()}회` : ""}
      </span>
    </a>
  );
}
