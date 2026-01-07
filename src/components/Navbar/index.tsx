import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { GoPeople } from 'react-icons/go';
import { MdOutlineMail } from 'react-icons/md';
import { ROUTES } from '@/constants/routes';

const neoPostIcon = new URL('@/assets/Icons/NeoPost.svg', import.meta.url).href;

const Navbar = () => {
  const navigate = useNavigate();
  const goHome = () => navigate(ROUTES.HOME);

  return (
    <nav className="navbar">
      <button onClick={goHome} className="navbar__title" aria-label="Go to home">
        <img className="navbar__title-logo" src={neoPostIcon} alt="Neopost" decoding="async" />
        <span>NEOPOST</span>
      </button>

      <div className="navbar__icons">
        <button className="navbar__icons-iconBtn" aria-label="People">
          <GoPeople className="navbar__icons-icon" />
        </button>
        <button className="navbar__icons-iconBtn" aria-label="Inbox">
          <MdOutlineMail className="navbar__icons-iconsBtn-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
