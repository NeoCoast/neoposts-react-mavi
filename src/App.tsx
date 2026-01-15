import { Routes, Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

import Layout from '@/components/Layout';
import AuthRedirect from '@/components/AuthRedirect';
import AppToaster from '@/components/Toaster';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import PostDetail from '@/pages/PostDetail';

import './App.scss';

const App = () => {

  return (
    <>
      <AppToaster position="top-center" />
      <Routes>
        <Route element={<Layout redirectPath={ROUTES.LOGIN} />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.POST} element={<PostDetail />} />
        </Route>
        <Route element={<AuthRedirect redirectPath={ROUTES.HOME} />}>
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
