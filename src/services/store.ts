import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware),
  reducer: {
    [api.reducerPath]: api.reducer
  }
});
