import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@/services/store';
import { openMobileMenu, closeMobileMenu } from '@/utils/uiSlice';
import { GoPeople } from 'react-icons/go';
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTES } from '@/constants/routes';
import MobileMenu from '@/components/MobileMenu';
import Button from '@/components/Button';

import './styles.scss';

const neoPostIcon = new URL('@/assets/Icons/neoPost.svg', import.meta.url).href;

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menuOpen = useSelector((state: RootState) => state.ui.mobileMenuOpen);

  const openMenu = () => dispatch(openMobileMenu());
  const closeMenu = () => dispatch(closeMobileMenu());

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--menuOpen' : ''}`}>
        <div className="navbar__left">
          <Link to={ROUTES.HOME} className="btn navbar__left-title btn--icon" aria-label="Go to home">
            <span className="btn__content">
              <img className="navbar__left-title-logo" src={neoPostIcon} alt="Neopost" />
              <span>NEOPOST</span>
            </span>
          </Link>
        </div>

        {!menuOpen && (
          <div className="navbar__icons">
            <Link to={ROUTES.USERS} className="navbar__icons-iconBtn navbar__icons-peopleBtn btn btn--icon" aria-label="People">
              <span className="btn__content">
                <GoPeople className="navbar__icons-iconBtn-icon" />
              </span>
            </Link>
            <Button
              variant='icon'
              className="navbar__icons-hamburger"
              aria-label="Open menu"
              onClick={openMenu}
            >
              <RxHamburgerMenu className="navbar__icons-iconBtn-icon" />
            </Button>
          </div>
        )}
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
