export default function DeviceSelector({ devices, selectedDevice, onSelect }) {
  return (
    <section
      aria-label="Vehicle active selector"
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3"
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
        Active vehicles
      </h2>
      <select
        value={selectedDevice?.id ?? ''}
        onChange={(e) => {
          const device = devices.find(d => d.id === Number(e.target.value));
          onSelect(device);
        }}
        aria-label="Select a vehicle to view its status"
        className="w-full px-3 py-[10px] rounded-lg text-sm bg-[var(--color-input-bg)] text-[var(--color-text-primary)] border border-[var(--color-border)] cursor-pointer outline-none"
      >
        <option value="" disabled>Select a vehicle</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>

      {selectedDevice && (
        <p className="text-xs text-[var(--color-text-secondary)]">
          ID: <span className="font-mono text-[var(--color-accent)]">
            {selectedDevice.id}
          </span>
        </p>
      )}
    </section>
  );
}