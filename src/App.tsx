import { Routes, Route } from 'react-router-dom';
import AppToaster from '@/components/Toaster';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import { ROUTES } from '@/constants/routes';

import './App.scss';

const App = () => {

  return (
    <>
      <AppToaster position="top-center" />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
