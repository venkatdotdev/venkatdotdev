export async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  // Not configured: caller falls back to honeypot + rate limiting only.
  if (!secret) return true;
  if (!token) return false;

  const params = new URLSearchParams({ secret, response: token });
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await res.json();
  return !!data.success;
}
