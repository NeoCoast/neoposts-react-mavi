const clearAuthTokens = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('token-type');
  localStorage.removeItem('client');
  localStorage.removeItem('expiry');
  localStorage.removeItem('uid');
};

export { clearAuthTokens };
