import { useEffect, useState } from 'react';

function PulseIndicator({ status }) {
  const isOnline = status === 'online';
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: '12px', height: '12px' }} aria-hidden="true">
      {isOnline && (
        <span style={{
          position: 'absolute',
          display: 'inline-flex',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: '#34d399',
          opacity: 0.75,
          animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
        }} />
      )}
      <span style={{
        position: 'relative',
        display: 'inline-flex',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: isOnline ? '#10b981' : '#94a3b8',
      }} />
    </span>
  );
}

function StatItem({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <dt style={{
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-text-secondary)',
      }}>
        {label}
      </dt>
      <dd style={{
        fontSize: '14px',
        fontWeight: '600',
        color: highlight ? 'var(--color-accent)' : 'var(--color-text-primary)',
        transition: 'color 0.5s ease',
      }}>
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
      aria-label={`Estado del vehículo ${device.name}`}
      aria-live="polite"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h14l4 4v4a2 2 0 01-2 2h-2" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7.5" cy="17.5" r="2.5" stroke="var(--color-accent)" strokeWidth="1.5"/>
            <circle cx="17.5" cy="17.5" r="2.5" stroke="var(--color-accent)" strokeWidth="1.5"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
          <h2 style={{
            fontSize: '15px',
            fontWeight: '600',
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {device.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <PulseIndicator status={status} />
            <span style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              textTransform: 'capitalize',
            }}>
              {status}
            </span>
          </div>
        </div>
      </div>
      <dl style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        <StatItem label="Velocidad" value={position ? formatSpeed(position.speed) : '—'} highlight={speedHighlight} />
        <StatItem label="Rumbo" value={position ? `${position.course}°` : '—'} />
        <StatItem label="Latitud" value={position ? position.latitude.toFixed(5) : '—'} />
        <StatItem label="Longitud" value={position ? position.longitude.toFixed(5) : '—'} />
        <div style={{ gridColumn: 'span 2' }}>
          <StatItem label="Última señal" value={position ? formatTime(position.fixTime) : '—'} />
        </div>
      </dl>
    </section>
  );
}