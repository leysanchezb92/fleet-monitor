import { useState, useEffect } from 'react';
import { useTraccar } from '@/hooks/useTraccar';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorState from '@/components/ErrorState';
import DeviceSelector from '@/components/DeviceSelector';
import StatusCard from '@/components/StatusCard';
import MapView from '@/components/MapView';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const {
    status,
    devices,
    selectedDevice,
    setSelectedDevice,
    position,
    error,
    retry,
  } = useTraccar();

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div
      className="h-screen min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors duration-300 ease-in-out"
    >
      <header
        className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            Fleet Monitor
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] text-[var(--color-accent)]"
          >
            Live
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.08em] transition-colors duration-300 text-[var(--color-accent)] dark:text-[var(--color-text-secondary)]">
            LIGHT MODE
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Change to light mode' : 'Change to dark mode'}
            aria-checked={darkMode}
            role="switch"
            className="w-[56px] h-[28px] rounded-full border border-[var(--color-border)] bg-[var(--color-input-bg)] cursor-pointer flex items-center p-[3px] transition-colors duration-300 relative"
          >
            <svg className="absolute left-[6px] opacity-100 dark:opacity-40 transition-opacity duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="5" stroke="var(--color-text-primary)" strokeWidth="1.5" />
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg className="absolute right-[6px] opacity-40 dark:opacity-100 transition-opacity duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className={`w-[22px] h-[22px] rounded-full bg-[var(--color-accent)] shrink-0 transition-transform duration-300 ${darkMode ? 'translate-x-[28px]' : 'translate-x-0'
              }`} />
          </button>
          <span className="text-[11px] font-bold tracking-[0.08em] transition-colors duration-300 text-[var(--color-text-secondary)] dark:text-[var(--color-accent)]">
            DARK MODE
          </span>
        </div>
      </header>
      <main className="flex flex-col md:flex-row gap-4 p-4 flex-1 min-h-0">
        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error' && (
          <ErrorState message={error} onRetry={retry} />
        )}
        {status === 'ready' && (
          <>
            <aside className="flex flex-col gap-4 w-full shrink-0 md:max-w-[320px]">
              <DeviceSelector
                devices={devices}
                selectedDevice={selectedDevice}
                onSelect={setSelectedDevice}
              />
              {selectedDevice && (
                <StatusCard
                  device={selectedDevice}
                  position={position}
                />
              )}
            </aside>
            <div className="flex-1 min-w-[300px] min-h-[400px]">
              <MapView position={position} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}