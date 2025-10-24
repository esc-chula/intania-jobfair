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
          <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          ) : null}
        </div>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="text-sm underline underline-offset-4 hover:opacity-80"
          >
            {actionLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}
