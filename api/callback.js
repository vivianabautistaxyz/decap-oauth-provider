export default async function handler(req, res) {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  const { code } = req.query;

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    res.status(400).send(`OAuth error: ${tokenData.error_description || 'no se obtuvo token'}`);
    return;
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <script>
      function receiveMessage(message) {
        window.opener.postMessage(
          'authorization:github:success:${payload.replace(/'/g, "\\'")}',
          message.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    </script>
  `);
}
