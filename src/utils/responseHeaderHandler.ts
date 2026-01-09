const clearAuthTokens = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('token-type');
  localStorage.removeItem('client');
  localStorage.removeItem('expiry');
  localStorage.removeItem('uid');
};

const setResponseHeaders = (metaData: Record<string, string>) => {
  if (!metaData) return;
  localStorage.setItem('access-token', metaData['access-token'] || '');
  localStorage.setItem('token-type', metaData['token-type'] || '');
  localStorage.setItem('client', metaData.client || '');
  localStorage.setItem('expiry', metaData.expiry || '');
  localStorage.setItem('uid', metaData.uid || '');
};

export { setResponseHeaders, clearAuthTokens };
