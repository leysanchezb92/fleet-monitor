export default async function handler(req, res) {
  const path = req.url.replace('/api', '');
  const targetUrl = `https://demo.traccar.org/api${path}`;

  const headers = {};

  if (req.headers.cookie) {
    headers['Cookie'] = req.headers.cookie;
  }

  if (req.method === 'POST') {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  let body = undefined;
  if (req.method !== 'GET' && req.body) {
    const params = new URLSearchParams(req.body);
    body = params.toString();
  }

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
  });

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    res.setHeader('Set-Cookie', setCookie);
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(response.status).send(await response.text());
}