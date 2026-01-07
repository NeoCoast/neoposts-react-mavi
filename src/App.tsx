import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

import AppToaster from '@/components/Toaster';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Layout from './components/Layout';
import AuthRedirect from './components/AuthRedirect';

import './App.scss';

const App = () => {

  return (
    <>
      <AppToaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout redirectPath={ROUTES.LOGIN} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<AuthRedirect redirectPath={ROUTES.HOME} />}>
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
