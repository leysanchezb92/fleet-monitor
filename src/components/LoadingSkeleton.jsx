function SkeletonBlock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-lg bg-[var(--color-skeleton)] animate-pulse ${className}`}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <aside
        role="status"
        aria-label="Charging vehicles and status information loading"
        className="flex flex-col gap-4 w-full shrink-0"
      >
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3">
          <SkeletonBlock className="h-3 w-[120px]" />
          <SkeletonBlock className="h-10 w-full" />
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="w-10 h-10 rounded-full" />
            <div className="flex-1 flex flex-col gap-2">
              <SkeletonBlock className="h-4 w-[60%]" />
              <SkeletonBlock className="h-3 w-[40%]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SkeletonBlock className="h-10" />
            <SkeletonBlock className="h-10" />
            <SkeletonBlock className="h-10" />
            <SkeletonBlock className="h-10" />
            <div className="col-span-2">
              <SkeletonBlock className="h-10" />
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 min-h-0">
        <SkeletonBlock className="w-full h-full rounded-xl" />
      </div>
    </>
  );
}