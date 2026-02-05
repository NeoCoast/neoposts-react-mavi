import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenu(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    openCreatePostModal(state) {
      state.createPostModalOpen = true;
      state.mobileMenuOpen = false;
    },
    closeCreatePostModal(state) {
      state.createPostModalOpen = false;
    },
    toggleCreatePostModal(state) {
      state.createPostModalOpen = !state.createPostModalOpen;
      if (state.createPostModalOpen) state.mobileMenuOpen = false;
    },
    setCreatePostModal(state, action: PayloadAction<boolean>) {
      state.createPostModalOpen = action.payload;
      if (action.payload) state.mobileMenuOpen = false;
    },
  },
});

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  setMobileMenu,
  openCreatePostModal,
  closeCreatePostModal,
  toggleCreatePostModal,
  setCreatePostModal,
} = uiSlice.actions;
export default uiSlice.reducer;
