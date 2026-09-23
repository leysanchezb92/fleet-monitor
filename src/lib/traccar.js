const BASE_URL = '';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function login(email, password) {
  const params = new URLSearchParams({ email, password });
  const res = await fetch(`${BASE_URL}/api/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Invalid credentials or unable to connect to Traccar server');
  return res.json();
}

export async function getDevices() {
  const res = await fetch(`${BASE_URL}/api/devices`, {
    headers,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error in fetching devices from Traccar server');
  return res.json();
}

export async function getPositions(deviceId) {
  const res = await fetch(`${BASE_URL}/api/positions?deviceId=${deviceId}`, {
    headers,
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error al obtener posición');
  return res.json();
} 