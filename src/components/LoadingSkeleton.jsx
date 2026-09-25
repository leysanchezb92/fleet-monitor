function SkeletonBlock({ className, animClass = 'animate-skeleton' }) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-lg bg-[var(--color-skeleton)] ${animClass} ${className}`}
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <aside
        role="status"
        aria-label="Loading vehicle monitor"
        className="flex flex-col gap-4 w-full md:max-w-[320px] shrink-0"
      >
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3">
          <SkeletonBlock className="h-3 w-28" animClass="animate-skeleton" />
          <SkeletonBlock className="h-10 w-full" animClass="animate-skeleton-1" />
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="w-10 h-10 rounded-full" animClass="animate-skeleton-2" />
            <div className="flex flex-col gap-2 flex-1">
              <SkeletonBlock className="h-3.5 w-3/5" animClass="animate-skeleton-3" />
              <SkeletonBlock className="h-3 w-2/5" animClass="animate-skeleton-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SkeletonBlock className="h-10" animClass="animate-skeleton-5" />
            <SkeletonBlock className="h-10" animClass="animate-skeleton-6" />
            <SkeletonBlock className="h-10" animClass="animate-skeleton-7" />
            <SkeletonBlock className="h-10" animClass="animate-skeleton-8" />
            <SkeletonBlock className="h-10 col-span-2" animClass="animate-skeleton-9" />
          </div>
        </div>
      </aside>
      <div className="flex-1 min-h-0">
        <SkeletonBlock
          className="w-full h-full rounded-xl min-h-[400px]"
          animClass="animate-skeleton-5"
        />
      </div>
    </>
  );
}