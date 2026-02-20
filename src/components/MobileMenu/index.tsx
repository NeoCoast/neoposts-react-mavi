import { GoPeople } from 'react-icons/go';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import cn from 'classnames';

import UserBar from '@/components/UserBar';
import Button from '@/components/Button';
import { ROUTES } from '@/constants/routes';

import './styles.scss';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goUsers = () => navigate(ROUTES.USERS);

  useEffect(() => {
    if (!open) return;
    onClose();
  }, [location.pathname]);

  return (
    <div className={cn('mobileMenu', { 'mobileMenu--open': open, })}>
      <div className="mobileMenu__backdrop" onClick={onClose} />
      <aside className="mobileMenu__panel" role="dialog" aria-modal="true">
        <div className="mobileMenu__panel-header">
          <div className="mobileMenu__panel-header-brand">
            <img className="mobileMenu__panel-header-brand-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
            <span className="mobileMenu__panel-header-brand-title">NEOPOST</span>
          </div>
          <Button
            variant="icon"
            className="mobileMenu__panel-header-close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <span className="mobileMenu__panel-header-close-icon">✕</span>
          </Button>
        </div>
        <div className="mobileMenu__icons">
          <div className="mobileMenu__icons-navbar">
            <Button
              variant="icon"
              className="mobileMenu__icons-navbar-iconBtn"
              aria-label="People"
              onClick={goUsers}
            >
              <GoPeople />
            </Button>
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
