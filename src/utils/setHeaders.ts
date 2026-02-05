export const setAuthHeaders = (headers: Headers): Headers => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const expiry = localStorage.getItem('expiry');
  const uid = localStorage.getItem('uid');

  if (token) headers.set('access-token', token);
  if (client) headers.set('client', client);
  if (expiry) headers.set('expiry', expiry);
  if (uid) headers.set('uid', uid);

  return headers;
};
