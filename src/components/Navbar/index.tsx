import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@/services/store';
import { openMobileMenu, closeMobileMenu } from '@/utils/sideBarSlice';
import { GoPeople } from 'react-icons/go';
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTES } from '@/constants/routes';
import MobileMenu from '@/components/MobileMenu';
import Button from '@/components/Button';

import './styles.scss';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const menuOpen = useSelector((state: RootState) => state.ui.mobileMenuOpen);

  const openMenu = () => dispatch(openMobileMenu());
  const closeMenu = () => dispatch(closeMobileMenu());

  const goHome = () => navigate(ROUTES.HOME);
  const goUsers = () => navigate(ROUTES.USERS);

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--menuOpen' : ''}`}>
        <div className="navbar__left">
          <Button
            variant="icon"
            className="navbar__left-title"
            aria-label="Go to home"
            onClick={goHome}
            title={
              <>
                <img className="navbar__left-title-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
                <span>NEOPOST</span>
              </>
            }
          />
        </div>

        {!menuOpen && (
          <div className="navbar__icons">
            <Button
              variant='icon'
              className="navbar__icons-iconBtn navbar__icons-peopleBtn"
              aria-label="People"
              onClick={goUsers}
              title={<GoPeople className="navbar__icons-iconBtn-icon" />}
            />
            <Button
              variant='icon'
              className="navbar__icons-hamburger"
              aria-label="Open menu"
              onClick={openMenu}
              title={<RxHamburgerMenu className="navbar__icons-iconBtn-icon" />}
            />
          </div>
        )}
      </nav>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
