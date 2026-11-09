import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: `${profile.name} | 링크나무`,
  description: `${profile.name} - ${profile.bio}. 내 모든 링크를 한 곳에서.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
