// app/(home)/components/section.tsx
import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  description,
  actionLabel,
  actionHref,
  children,
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="heading-th-2 text-[color:var(--color-primary-blue)]">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          ) : null}
        </div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="body-th-2 text-[#4A5565] hover:opacity-80 flex items-center gap-1"
          >
            {actionLabel} <span>&gt;</span>
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
