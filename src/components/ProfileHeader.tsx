import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 톤의 겹 그림자로 살짝 떠 있는 느낌 */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-[0_2px_4px_rgba(120,72,40,0.08),0_16px_32px_-12px_rgba(120,72,40,0.4)] ring-4 ring-white/80 sm:h-32 sm:w-32 dark:ring-white/10">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          fill
          sizes="128px"
          priority
          unoptimized={profile.image.endsWith(".svg") || profile.image.startsWith("http")}
          className="object-cover"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
        {profile.name}
      </h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {profile.bio}
      </p>
    </header>
  );
}
