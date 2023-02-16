export function logout() {
  // Remove the JWT token from the user's browser by setting an empty value
  return new Response(null, {
    headers: { 'Set-Cookie': `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0` },
  });
}