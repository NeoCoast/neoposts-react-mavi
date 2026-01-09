import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoPeople } from 'react-icons/go';
import { MdOutlineMail } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTES } from '@/constants/routes';
import MobileMenu from '@/components/MobileMenu';

import './styles.scss';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = () => navigate(ROUTES.HOME);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--menuOpen' : ''}`}>
        <div className="navbar__left">

          <button onClick={goHome} className="navbar__left-title" aria-label="Go to home">
            <img className="navbar__left-title-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
            <span>NEOPOST</span>
          </button>
        </div>

        {!menuOpen && (
          <div className="navbar__icons">
            <button className="navbar__icons-iconBtn navbar__icons-peopleBtn" aria-label="People">
              <GoPeople className="navbar__icons-iconBtn-icon" />
            </button>
            <button className="navbar__icons-hamburger" onClick={openMenu} aria-label="Open menu">
              <RxHamburgerMenu />
            </button>
          </div>
        )}
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
