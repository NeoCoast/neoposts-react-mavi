import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import SidebarLayout from '@/components/SidebarLayout';

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

  return (
    <>
      <Navbar />
      <SidebarLayout>
        <Outlet />
      </SidebarLayout>
    </>
  );
};

export default Layout;
