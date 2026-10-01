export default function handler(req, res) {
  const { GITHUB_CLIENT_ID } = process.env;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${req.headers.host}/api/callback`;

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
  });

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
  });
  res.end();
}
