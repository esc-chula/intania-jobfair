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
    className="fixed inset-x-0 top-[56px] sm:top-[64px] md:top-[72px] z-50
       bg-primary-yellow
       border-t border-[color:var(--border)]
     "
  >
    <div className="mx-auto max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] px-4 sm:px-6 md:px-8">
      <div
        ref={panelRef}
        className="
          w-full sm:w-[200px] md:w-[240px] min-h-[130px] sm:min-h-[150px] md:min-h-[170px]
          py-4 sm:py-6 md:py-8
          flex flex-col gap-4 sm:gap-5 md:gap-6
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
        flex items-center gap-2 sm:gap-3 md:gap-4
        text-primary-blue
        font-bodyEN font-bold text-[16px] sm:text-[18px] md:text-[20px]
        leading-[22px] sm:leading-[24px] md:leading-[26px] 
        h-[22px] sm:h-[24px] md:h-[26px]
        hover:opacity-80 transition-opacity
      "
    >
      <span className="size-4 sm:size-5 md:size-6 inline-flex items-center justify-center">{icon}</span>
      {label}
    </Link>
  );
}
