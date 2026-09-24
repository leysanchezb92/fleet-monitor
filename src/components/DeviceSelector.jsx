import { useState, useRef, useEffect } from 'react';

export default function DeviceSelector({ devices, selectedDevice, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
    if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const items = containerRef.current.querySelectorAll('[role="option"]');
      items[0]?.focus();
    }
  }

  function handleOptionKeyDown(e, device, index) {
    const items = containerRef.current.querySelectorAll('[role="option"]');
    if (e.key === 'ArrowDown') { e.preventDefault(); items[index + 1]?.focus(); }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) containerRef.current.querySelector('[role="combobox"]').focus();
      else items[index - 1]?.focus();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(device);
      setIsOpen(false);
      containerRef.current.querySelector('[role="combobox"]').focus();
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      containerRef.current.querySelector('[role="combobox"]').focus();
    }
  }

  return (
    <section
      aria-label="Vehicle Selector"
      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3"
    >
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
        Active Vehicle
      </h2>
      <div ref={containerRef} className="relative">
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select a vehicle"
          tabIndex={0}
          onClick={() => setIsOpen(prev => !prev)}
          onKeyDown={handleKeyDown}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg 
            bg-[var(--color-input-bg)] cursor-pointer outline-none transition-all duration-200
            ${isOpen
              ? 'border border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/20'
              : 'border border-[var(--color-border)]'
            }`}
        >
          <span className={`text-sm ${selectedDevice ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
            {selectedDevice ? selectedDevice.name : 'Select a vehicle'}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <path d="M6 9l6 6 6-6" stroke="var(--color-text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {isOpen && (
          <ul
            role="listbox"
            aria-label="List of vehicles"
            className="absolute top-[calc(100%+6px)] left-0 right-0 z-50
              bg-[var(--color-surface)] border border-[var(--color-border)]
              rounded-xl p-1.5 flex flex-col gap-0.5
              shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
          >
            {devices.map((device, index) => {
              const isSelected = selectedDevice?.id === device.id;
              return (
                <li
                  key={device.id}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => { onSelect(device); setIsOpen(false); }}
                  onKeyDown={(e) => handleOptionKeyDown(e, device, index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg
                    text-sm cursor-pointer outline-none transition-colors duration-150
                    focus:bg-[var(--color-accent)]/10
                    hover:bg-[var(--color-accent)]/10
                    ${isSelected
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold'
                      : 'text-[var(--color-text-primary)] font-normal'
                    }`}
                >
                  <span>{device.name}</span>
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {selectedDevice && (
        <p className="text-xs text-[var(--color-text-secondary)]">
          ID: <span className="font-mono text-[var(--color-accent)]">{selectedDevice.id}</span>
        </p>
      )}
    </section>
  );
}