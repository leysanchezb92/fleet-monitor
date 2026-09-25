import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TILES = {
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
};

const vehicleIcon = (course = 0) => L.divIcon({
  className: '',
  html: `
    <div style="transform: rotate(${course}deg); transition: transform 0.8s ease;" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#38BDF8" fill-opacity="0.15" stroke="#38BDF8" stroke-width="1.5"/>
        <path d="M16 6 L21 22 L16 19 L11 22 Z" fill="#38BDF8"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function TileLayerSwitcher({ darkMode }) {
  const map = useMap();
  const tile = darkMode ? TILES.dark : TILES.light;

  useEffect(() => {
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) map.removeLayer(layer);
    });
    L.tileLayer(tile.url, { attribution: tile.attribution }).addTo(map);
  }, [darkMode]);

  return null;
}

function AnimatedMarker({ position, course }) {
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    if (!markerRef.current || !position) return;
    const newLatLng = L.latLng(position.latitude, position.longitude);
    markerRef.current.setLatLng(newLatLng);
    markerRef.current.setIcon(vehicleIcon(course));
    map.flyTo(newLatLng, map.getZoom(), { animate: true, duration: 1.5 });
  }, [position, course]);

  if (!position) return null;

  return (
    <Marker
      ref={markerRef}
      position={[position.latitude, position.longitude]}
      icon={vehicleIcon(course)}
      aria-label={`Vehicle at latitude ${position.latitude.toFixed(4)}, longitude ${position.longitude.toFixed(4)}`}
    />
  );
}

export default function MapView({ position, darkMode }) {
  const defaultCenter = [4.711, -74.0721];
  const hasPosition = position?.latitude && position?.longitude;
  const tile = darkMode ? TILES.dark : TILES.light;

  return (
    <div
      style={{ height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}
      className="w-full"
    >
      <MapContainer
        center={hasPosition ? [position.latitude, position.longitude] : defaultCenter}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url={tile.url} attribution={tile.attribution} />
        <TileLayerSwitcher darkMode={darkMode} />
        {hasPosition && (
          <AnimatedMarker
            position={position}
            course={position.course ?? 0}
          />
        )}
      </MapContainer>
    </div>
  );
}