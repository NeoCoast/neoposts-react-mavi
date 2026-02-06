import { createSlice } from '@reduxjs/toolkit';

type UIState = {
  mobileMenuOpen: boolean;
  createPostModalOpen: boolean;
};

const initialState: UIState = {
  mobileMenuOpen: false,
  createPostModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
      state.createPostModalOpen = false;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    openCreatePostModal(state) {
      state.createPostModalOpen = true;
      state.mobileMenuOpen = false;
    },
    closeCreatePostModal(state) {
      state.createPostModalOpen = false;
    },
  },
});

export const {
  openMobileMenu,
  closeMobileMenu,
  openCreatePostModal,
  closeCreatePostModal,
} = uiSlice.actions;
export default uiSlice.reducer;
