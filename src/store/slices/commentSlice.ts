import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CommentsState {
  isAddCommentModalOpen: boolean;
  isDeleteCommentModalOpen: boolean;
  selectedCommentId: number | null;
}

const initialState: CommentsState = {
  isAddCommentModalOpen: false,
  isDeleteCommentModalOpen: false,
  selectedCommentId: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    openAddCommentModal: (state) => {
      state.isAddCommentModalOpen = true;
    },
    closeAddCommentModal: (state) => {
      state.isAddCommentModalOpen = false;
    },
    openDeleteCommentModal: (state, action: PayloadAction<number>) => {
      state.isDeleteCommentModalOpen = true;
      state.selectedCommentId = action.payload;
    },
    closeDeleteCommentModal: (state) => {
      state.isDeleteCommentModalOpen = false;
      state.selectedCommentId = null;
    },
  },
});

// Actions
export const {
  openAddCommentModal,
  closeAddCommentModal,
  openDeleteCommentModal,
  closeDeleteCommentModal,
} = commentsSlice.actions;

// Selectors
export const selectIsAddCommentModalOpen = (state: RootState) => 
  state.comments.isAddCommentModalOpen;
export const selectIsDeleteCommentModalOpen = (state: RootState) => 
  state.comments.isDeleteCommentModalOpen;
export const selectSelectedCommentId = (state: RootState) => 
  state.comments.selectedCommentId;

export default commentsSlice.reducer;