export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border p-4">
      <div className="h-4 w-1/3 rounded bg-muted mb-3" />
      <div className="h-4 w-2/3 rounded bg-muted mb-2" />
      <div className="h-4 w-1/2 rounded bg-muted" />
    </div>
  );
}