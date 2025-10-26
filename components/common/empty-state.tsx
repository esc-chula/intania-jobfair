type Props = { 
  title: string; 
  hint?: string;
  titleClassName?: string;
};

export default function EmptyState({ title, hint, titleClassName }: Props) {
  return (
    <div className="rounded-lg border p-6 text-center bg-white">
      <p className={` ${titleClassName || ""}`}>{title}</p>
      {hint ? <p className="text-sm text-muted-foreground mt-1">{hint}</p> : null}
    </div>
  );
}