import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import './styles.scss';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.HOME, { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <main className="notFound">
      <h1 className="notFound__title">404 - Page Not Found</h1>
      <p className="notFound__message">Sorry, the page you are looking for does not exist.</p>
    </main>
  );
};

export default NotFound;
