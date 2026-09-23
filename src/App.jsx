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
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Fleet Monitor
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
              color: 'var(--color-accent)',
            }}
          >
            Live
          </span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: 'var(--color-input-bg)',
            color: 'var(--color-text-primary)',
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <main style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px',
        flex: 1,
        minHeight: 0,
        alignContent: 'flex-start',
      }}>

        {status === 'loading' && <LoadingSkeleton />}

        {status === 'error' && (
          <ErrorState message={error} onRetry={retry} />
        )}

        {status === 'ready' && (
          <>
            <aside 
            className="md:max-w-[320px]"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
              flexShrink: 0,
            }}>
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

            <div style={{
              flex: 1,
              minWidth: '300px',
              minHeight: '400px',
            }}>
              <MapView position={position} />
            </div>
          </>
        )}

      </main>
    </div>
  );
}