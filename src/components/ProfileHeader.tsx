import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-stone-800 shadow-md sm:h-64 sm:w-64 dark:border-stone-200">
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          fill
          sizes="256px"
          priority
          unoptimized={profile.image.endsWith(".svg")}
          className="object-cover"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-[0.3em] text-stone-900 dark:text-stone-100">
        {profile.name}
      </h1>
      <p className="mt-2 text-base text-stone-600 dark:text-stone-400">{profile.bio}</p>
    </header>
  );
}
