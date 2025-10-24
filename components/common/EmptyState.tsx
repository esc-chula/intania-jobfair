type Props = { title: string; hint?: string };

export default function EmptyState({ title, hint }: Props) {
  return (
    <div className="rounded-lg border p-6 text-center">
      <p className="font-medium">{title}</p>
      {hint ? <p className="text-sm text-muted-foreground mt-1">{hint}</p> : null}
    </div>
  );
}