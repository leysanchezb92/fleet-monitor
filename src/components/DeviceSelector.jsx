export default function DeviceSelector({ devices, selectedDevice, onSelect }) {
  return (
    <section
      aria-label="Selector de vehículo"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <h2 style={{
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-secondary)',
      }}>
        Active vehicles
      </h2>
      <select
        value={selectedDevice?.id ?? ''}
        onChange={(e) => {
          const device = devices.find(d => d.id === Number(e.target.value));
          onSelect(device);
        }}
        aria-label="Selecciona un vehículo para monitorear"
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          fontSize: '14px',
          backgroundColor: 'var(--color-input-bg)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <option value="" disabled>Selecciona un vehículo...</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>

      {selectedDevice && (
        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          ID: <span style={{ fontFamily: 'monospace', color: 'var(--color-accent)' }}>
            {selectedDevice.id}
          </span>
        </p>
      )}
    </section>
  );
}