import React from 'react';
import { Toaster } from 'react-hot-toast';
import type { ToastPosition, ToastOptions } from 'react-hot-toast';

import './styles.scss';

type AppToasterProps = {
  position?: ToastPosition;
  toastOptions?: ToastOptions;
};

const AppToaster: React.FC<AppToasterProps> = ({ position = 'top-center', toastOptions }) => (
  <Toaster
    position={position}
    containerClassName="app-toaster-container"
    containerStyle={{
      zIndex: 4000,
    }}
    toastOptions={{
      className: 'app-toast',
      ...toastOptions,
    }}
  />
);

export default AppToaster;
