import { useState, useEffect, useCallback, useRef } from 'react';
import { login, getDevices, getPositions } from '@/lib/traccar';

export function useTraccar() {
  const [status, setStatus] = useState('idle'); // idle | loading | error | ready
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const pollingRef = useRef(null);

  const initialize = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      await login(
        import.meta.env.VITE_TRACCAR_EMAIL,
        import.meta.env.VITE_TRACCAR_PASSWORD
    );
      const devs = await getDevices();
      setDevices(devs);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Error Traccar connection');
      setStatus('error');
    }
  }, []);

  const fetchPosition = useCallback(async (deviceId) => {
    try {
      const positions = await getPositions(deviceId);
      if (positions.length > 0) setPosition(positions[0]);
    } catch (err) {
      setError(err.message || 'Error fetching position from Traccar server');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!selectedDevice) return;
    fetchPosition(selectedDevice.id);
    pollingRef.current = setInterval(() => {
      fetchPosition(selectedDevice.id);
    }, 10000);
    return () => clearInterval(pollingRef.current);
  }, [selectedDevice, fetchPosition]);

  return {
    status,
    devices,
    selectedDevice,
    setSelectedDevice,
    position,
    error,
    retry: initialize,
  };
}