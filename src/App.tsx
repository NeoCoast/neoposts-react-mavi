import './App.scss';
import { Routes, Route } from 'react-router-dom';
import AppToaster from '@/components/Toaster';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import { ROUTES } from '@/constants/routes';

const App = () => {

    return (
        <>
            <AppToaster position="top-center" />
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Routes>
        </>
    );
};

export default App;
