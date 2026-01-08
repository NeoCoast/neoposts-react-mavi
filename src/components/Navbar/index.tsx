import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoPeople } from 'react-icons/go';
import { MdOutlineMail } from 'react-icons/md';
import { ROUTES } from '@/constants/routes';
import MobileMenu from '@/components/MobileMenu';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Navbar = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(ROUTES.HOME);

  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--menuOpen' : ''}`}>
        <div className="navbar__left">
          <button className="navbar__left-hamburger" onClick={openMenu} aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>

          <button onClick={goHome} className="navbar__left-title" aria-label="Go to home">
            <img className="navbar__left-title-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
            <span>NEOPOST</span>
          </button>
        </div>

        {!menuOpen && (
          <div className="navbar__icons">
            <button className="navbar__icons-iconBtn" aria-label="People">
              <GoPeople className="navbar__icons-iconBtn-icon" />
            </button>
            <button className="navbar__icons-iconBtn" aria-label="Inbox">
              <MdOutlineMail className="navbar__icons-iconBtn-icon" />
            </button>
          </div>
        )}
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
