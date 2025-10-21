"use client";

import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import { Building2, BriefcaseBusiness, Phone } from "lucide-react";

type Props = {
  id?: string;
  open: boolean;
  onClose: () => void;
  anchorRef?: RefObject<HTMLElement>;
};

export default function ExpandedNav({ id, open, onClose, anchorRef }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        !(anchorRef?.current && anchorRef.current.contains(t))
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
  <div
    id={id}
    role="dialog"
    aria-modal="true"
    className="fixed inset-x-0 top-[56px] z-50
       bg-primary-yellow
       border-t border-[color:var(--border)]
     "
  >
    <div className="mx-auto max-w-[320px] px-6">
      {/* เอา padding ซ้าย/ขวาออก ให้ wrapper เป็นคนกำหนด 24px */}
      <div
        ref={panelRef}
        className="
          w-[160px] min-h-[130px]
          py-4
          flex flex-col gap-4
        "
      >
        <NavItem href="/companies" icon={<Building2 strokeWidth={2} />} label="Companies" />
        <NavItem href="/jobs" icon={<BriefcaseBusiness strokeWidth={2} />} label="Jobs" />
        <NavItem href="/contact" icon={<Phone strokeWidth={2} />} label="Contact Us" />
      </div>
    </div>
  </div>
);

}

function NavItem({
  href, icon, label,
}: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-2
        text-primary-blue
        font-bodyEN font-bold text-[16px]
        leading-[22px] h-[22px]
      "
    >
      <span className="size-4 inline-flex items-center justify-center">{icon}</span>
      {label}
    </Link>
  );
}
