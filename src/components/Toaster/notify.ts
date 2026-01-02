import { toast } from 'react-hot-toast';
import type { ToastOptions } from 'react-hot-toast';

export const notify = {
    success: (message: string, options?: ToastOptions) => toast.success(message, options),
    error: (message: string, options?: ToastOptions) => toast.error(message, options),
    loading: (message: string, options?: ToastOptions) => toast.loading(message, options),
    message: (message: string, options?: ToastOptions) => toast(message, options),
    promise: (
        promise: Parameters<typeof toast.promise>[0],
        msgs: Parameters<typeof toast.promise>[1],
        options?: Parameters<typeof toast.promise>[2]
    ) => toast.promise(promise, msgs, options),
};
