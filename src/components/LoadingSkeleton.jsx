function SkeletonBlock({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-lg bg-[var(--color-skeleton)] animate-pulse ${className}`}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="vehicle data loading"
      className="flex flex-col lg:flex-row min-h-screen bg-[var(--color-bg)] p-4 gap-4"
    >
      <div className="flex flex-col gap-4 w-full lg:w-80 shrink-0">
        <div className="rounded-xl p-4 bg-[var(--color-surface)] flex flex-col gap-3">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-10 w-full" />
        </div>
        <div className="rounded-xl p-4 bg-[var(--color-surface)] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-full" />
            <SkeletonBlock className="h-3 w-2/3" />
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-[var(--color-surface)] overflow-hidden relative">
        <SkeletonBlock className="w-full h-full min-h-64 rounded-xl" />
      </div>
    </div>
  );
}