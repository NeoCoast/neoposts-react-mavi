import { Navigate, Outlet } from 'react-router-dom';

interface AuthRedirectProps {
  redirectPath: string;
}

const AuthRedirect = ({ redirectPath }: AuthRedirectProps) => {
  const isAuthenticated = Boolean(
    localStorage.getItem('access-token')
  );

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthRedirect;
