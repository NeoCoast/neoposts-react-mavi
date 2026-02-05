import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UIState = {
  mobileMenuOpen: boolean;
};

const initialState: UIState = {
  mobileMenuOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
  },
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu, setMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
