import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="h-10 w-10 rounded-full bg-brand/10 ring-1 ring-brand/30 grid place-items-center overflow-hidden">
        <Image
          src="/logo_transparent.png"
          alt="Dr B. Ben Romdhane Logo"
          width={35}
          height={35}
          className="object-contain rounded-full"
          priority
        />
      </div>
      <div className="leading-tight">
        <p className="font-semibold">Dr B. Ben Romdhane</p>
        <p className="text-xs text-slate-500">Ophtalmologiste • Depuis 1990</p>
      </div>
    </Link>
  );
}
