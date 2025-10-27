"use client";

import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import { Building2, BriefcaseBusiness, Phone } from "lucide-react";

type Props = {
    id?: string;
    open: boolean;
    onClose: () => void;
    anchorRef?: RefObject<HTMLElement | null>;
};

export default function ExpandedNav({ id, open, onClose, anchorRef }: Props) {
    const [isClient, setIsClient] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    return (
        <div
            id={id}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            className={`fixed inset-x-0 z-50 bg-primary-yellow border-t border-[color:var(--border)] transition-opacity duration-200 ease-out ${
                isClient
                    ? "top-[56px] sm:top-[64px] md:top-[72px]"
                    : "top-[56px]"
            } ${
                open
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`mx-auto px-4 ${
                    isClient
                        ? "max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] sm:px-6 md:px-8"
                        : "max-w-[320px]"
                }`}
            >
                <div
                    ref={panelRef}
                    className={`w-full flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-out transform-gpu ${
                        open
                            ? `${
                                  isClient
                                      ? "sm:w-[200px] md:w-[240px] sm:gap-5 md:gap-6"
                                      : ""
                              } opacity-100 translate-y-0 max-h-[70vh] py-6`
                            : `opacity-0 -translate-y-3 max-h-0 py-0`
                    } ${isClient ? "" : ""}`}
                >
                    <NavItem
                        href="/companies"
                        icon={<Building2 strokeWidth={2} />}
                        label="Companies"
                        isClient={isClient}
                        onClose={onClose}
                    />
                    <NavItem
                        href="/jobs"
                        icon={<BriefcaseBusiness strokeWidth={2} />}
                        label="Jobs"
                        isClient={isClient}
                        onClose={onClose}
                    />
                    <NavItem
                        href="/contact"
                        icon={<Phone strokeWidth={2} />}
                        label="Contact Us"
                        isClient={isClient}
                        onClose={onClose}
                    />
                </div>
            </div>
        </div>
    );
}

function NavItem({
    href,
    icon,
    label,
    isClient,
    onClose,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    isClient: boolean;
    onClose: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClose}
            className={`flex items-center text-primary-blue font-bodyEN font-bold ${
                isClient
                    ? "gap-2 sm:gap-3 md:gap-4 text-[16px] sm:text-[18px] md:text-[20px] leading-[22px] sm:leading-[24px] md:leading-[26px] h-[22px] sm:h-[24px] md:h-[26px] hover:opacity-80 transition-opacity"
                    : "gap-2 text-[16px] leading-[22px] h-[22px]"
            }`}
        >
            <span
                className={`inline-flex items-center justify-center ${
                    isClient ? "size-4 sm:size-5 md:size-6" : "size-4"
                }`}
            >
                {icon}
            </span>
            {label}
        </Link>
    );
}
