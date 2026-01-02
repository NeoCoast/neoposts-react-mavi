import './styles.scss';
import { Toaster } from 'react-hot-toast';
import type { ToastPosition, ToastOptions } from 'react-hot-toast';

type AppToasterProps = {
    position?: ToastPosition;
    toastOptions?: ToastOptions;
};

const AppToaster = ({ position = 'top-center', toastOptions }: AppToasterProps) => (
    <Toaster
        position={position}
        containerClassName="app-toaster-container"
        toastOptions={{
            className: 'app-toast',
            ...toastOptions,
        }}
    />
);

export default AppToaster;
