import { useEffect, useState } from 'react';

function PulseIndicator({ status }) {
  const isOnline = status === 'online';
  return (
    <span className="relative flex h-3 w-3" aria-hidden="true">
      {isOnline && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-[var(--color-text-secondary)]'}`} />
    </span>
  );
}

function StatItem({ label, value, highlight }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
        {label}
      </dt>
      <dd className={`text-sm font-semibold transition-colors duration-500 ${
        highlight ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'
      }`}>
        {value}
      </dd>
    </div>
  );
}

function formatTime(fixTime) {
  if (!fixTime) return '—';
  const date = new Date(fixTime);
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 10) return 'Justo ahora';
  if (diffSec < 60) return `Hace ${diffSec} segundos`;
  if (diffSec < 3600) return `Hace ${Math.floor(diffSec / 60)} min`;
  return date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
}

function formatSpeed(knots) {
  return `${(knots * 1.852).toFixed(1)} km/h`;
}

export default function StatusCard({ device, position }) {
  const [speedHighlight, setSpeedHighlight] = useState(false);
  const [prevSpeed, setPrevSpeed] = useState(null);

  useEffect(() => {
    if (position?.speed === undefined) return;
    if (prevSpeed !== null && prevSpeed !== position.speed) {
      setSpeedHighlight(true);
      const t = setTimeout(() => setSpeedHighlight(false), 1500);
      return () => clearTimeout(t);
    }
    setPrevSpeed(position.speed);
  }, [position?.speed]);

  if (!device) return null;

  const status = device.status ?? 'offline';

  return (
    <section
      aria-label={`Vehicle Status ${device.name}`}
      aria-live="polite"
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14l4 4v4a2 2 0 01-2 2h-2" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7.5" cy="17.5" r="2.5" stroke="var(--color-accent)" strokeWidth="1.5"/>
            <circle cx="17.5" cy="17.5" r="2.5" stroke="var(--color-accent)" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
            {device.name}
          </h2>
          <div className="flex items-center gap-1.5">
            <PulseIndicator status={status} />
            <span className="text-xs text-[var(--color-text-secondary)] capitalize">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-2 gap-3">
        <StatItem
          label="Velocity"
          value={position ? formatSpeed(position.speed) : '—'}
          highlight={speedHighlight}
        />
        <StatItem
          label="Course"
          value={position ? `${position.course}°` : '—'}
        />
        <StatItem
          label="Latitude"
          value={position ? position.latitude.toFixed(5) : '—'}
        />
        <StatItem
          label="Longitude"
          value={position ? position.longitude.toFixed(5) : '—'}
        />
        <div className="col-span-2">
          <StatItem
            label="Last Signal"
            value={position ? formatTime(position.fixTime) : '—'}
          />
        </div>
      </dl>
    </section>
  );
}