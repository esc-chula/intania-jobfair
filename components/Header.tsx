import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          INTANIA Job Fair
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/companies">บริษัท</Link>
          <Link href="/jobs">ตำแหน่งงาน</Link>
          <Link href="/contact">ติดต่อเรา</Link>
        </nav>
      </div>
    </header>
  );
}
