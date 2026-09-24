export default function ErrorState({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex-1 flex flex-col items-center justify-center gap-6 p-8"
    >
      <div className="flex flex-col items-center gap-4 max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5"/>
            <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Connection failed
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {message || 'The Traccar server is unavailable. Check your connection and try again.'}
          </p>
        </div>
        <button
          onClick={onRetry}
          className="mt-2 px-6 py-2.5 rounded-lg bg-[var(--color-accent)] text-white
            text-sm font-medium hover:opacity-90 transition-opacity
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2"
        >
          Retry
        </button>
      </div>
    </div>
  );
}