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
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity bg-[var(--color-input-bg)] text-[var(--color-text-primary)]"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
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