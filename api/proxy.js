export default async function handler(req, res) {
  const targetUrl = `https://demo.traccar.org${req.url.replace('/api/proxy', '')}`;
  
  const headers = {
    'Content-Type': req.headers['content-type'] || 'application/json',
    'Accept': 'application/json',
  };

  if (req.headers.cookie) {
    headers['Cookie'] = req.headers.cookie;
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    res.setHeader('Set-Cookie', setCookie);
  }

  const data = await response.text();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(response.status).send(data);
}