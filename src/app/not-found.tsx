import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-between bg-ink px-6 py-8 text-paper">
      <p className="display text-2xl">
        {siteConfig.logoText}
        <span className="text-accent">{siteConfig.logoMark}</span>
      </p>
      <div>
        <p className="label text-accent">404</p>
        <h1 className="display mt-4 text-[clamp(3rem,8vw,6rem)]">Хуудас олдсонгүй.</h1>
        <Link href="/" className="label mt-8 inline-flex min-h-11 items-center border border-paper px-4 text-paper">
          Нүүр рүү буцах
        </Link>
      </div>
      <p className="label text-white/45">{siteConfig.tagline}</p>
    </main>
  );
}
