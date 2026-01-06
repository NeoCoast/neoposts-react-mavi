const setResponseHeaders = (metaData?: Headers) => {
  if (!metaData) return;
  localStorage.setItem('access-token', metaData.get('access-token') ?? '');
  localStorage.setItem('token-type', metaData.get('token-type') ?? '');
  localStorage.setItem('client', metaData.get('client') ?? '');
  localStorage.setItem('expiry', metaData.get('expiry') ?? '');
  localStorage.setItem('uid', metaData.get('uid') ?? '');
};

export { setResponseHeaders };
