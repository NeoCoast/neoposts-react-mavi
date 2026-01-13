import { GoPeople } from 'react-icons/go';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import UserBar from '@/components/UserBar';

import './styles.scss';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!open) return;
    onClose();
  }, [location.pathname]);

  return (
    <div className={`mobileMenu ${open ? 'mobileMenu--open' : ''}`}>
      <div className="mobileMenu__backdrop" onClick={onClose} />
      <aside className="mobileMenu__panel" role="dialog" aria-modal="true">
        <div className="mobileMenu__panel-header">
          <div className="mobileMenu__panel-header-brand">
            <img className="mobileMenu__panel-header-brand-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
            <span className="mobileMenu__panel-header-brand-title">NEOPOST</span>
          </div>
          <button className="mobileMenu__panel-header-close" aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mobileMenu__icons">
          <div className="mobileMenu__icons-navbar">
            <button className="mobileMenu__icons-navbar-iconBtn" aria-label="People">
              <GoPeople />
            </button>
          </div>
        </div>
        <div className="mobileMenu__content">
          <UserBar className={'mobileMenu__profile profile__sidebar--static'} />
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
