import { Navigate, Outlet } from 'react-router-dom';

interface LayoutProps {
  redirectPath: string;
}

const Layout = ({ redirectPath }: LayoutProps) => {
  const isAuthenticated = Boolean(
    localStorage.getItem('access-token')
  );

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default Layout;
