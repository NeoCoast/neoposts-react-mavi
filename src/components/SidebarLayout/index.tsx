import { ReactNode } from 'react';

import UserBar from '@/components/UserBar';

import './styles.scss';

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <div className="sidebar-layout">
      <UserBar className="sidebar-layout__sidebar" />
      <div className="sidebar-layout__content">{children}</div>
    </div>
  );
};

export default SidebarLayout;
