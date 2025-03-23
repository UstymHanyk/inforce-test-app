import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOption } from '../../types/Product';
import { RootState } from '../store';

interface ProductsState {
  sortOption: SortOption;
  selectedProductId: number | null;
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
}

const initialState: ProductsState = {
  sortOption: 'name-asc',
  selectedProductId: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortOption = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<number | null>) => {
      state.selectedProductId = action.payload;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    openDeleteModal: (state) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
    },
  },
});

// Actions
export const {
  setSortOption,
  setSelectedProductId,
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = productsSlice.actions;

// Selectors
export const selectSortOption = (state: RootState) => state.products.sortOption;
export const selectSelectedProductId = (state: RootState) => state.products.selectedProductId;
export const selectIsAddModalOpen = (state: RootState) => state.products.isAddModalOpen;
export const selectIsEditModalOpen = (state: RootState) => state.products.isEditModalOpen;
export const selectIsDeleteModalOpen = (state: RootState) => state.products.isDeleteModalOpen;

// Selector for sorted products
export const selectSortedProducts = (products: Product[], sortOption: SortOption) => {
  const sortedProducts = [...products];
  
  switch (sortOption) {
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      
    case 'count-asc':
      return sortedProducts.sort((a, b) => a.count - b.count);
      
    case 'count-desc':
      return sortedProducts.sort((a, b) => b.count - a.count);

    default:
      return sortedProducts;
  }
};


export default productsSlice.reducer;