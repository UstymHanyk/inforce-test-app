import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useGetProductsQuery, 
  useAddProductMutation, 
  useDeleteProductMutation 
} from '../services/productsApi';
import { 
  openAddModal, 
  closeAddModal, 
  openDeleteModal, 
  closeDeleteModal, 
  selectIsAddModalOpen, 
  selectIsDeleteModalOpen,
  setSortOption,
  selectSortOption,
  selectSelectedProductId,
  setSelectedProductId,
  selectSortedProducts
} from '../store/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import EmptyState from '../components/products/EmptyState';
import ProductForm from '../components/products/ProductForm';
import DeleteConfirmation from '../components/products/DeleteConfirmation';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import SortDropdown from '../components/products/SortDropdown';
import { Product, ProductFormData, SortOption } from '../types/Product';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const sortOption = useSelector(selectSortOption);
  const isAddModalOpen = useSelector(selectIsAddModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const selectedProductId = useSelector(selectSelectedProductId);
  
  const { data: products = [], isLoading, isError, refetch } = useGetProductsQuery();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  
  const sortedProducts = React.useMemo(() => {
    return selectSortedProducts(products, sortOption);
  }, [products, sortOption]);
  
  // Handle add product
  const handleAddProduct = async (productData: ProductFormData) => {
    try {
      await addProduct(productData).unwrap();
      dispatch(closeAddModal());
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  
  // Handle delete product
  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(selectedProductId).unwrap();
        dispatch(closeDeleteModal());
        dispatch(setSelectedProductId(null));
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };
  
  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    dispatch(setSortOption(option));
  };
  
  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    dispatch(setSelectedProductId(id));
    dispatch(openDeleteModal());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <SortDropdown 
              value={sortOption} 
              onChange={handleSortChange} 
            />
            
            <Button 
              onClick={() => dispatch(openAddModal())} 
              variant="primary"
            >
              Add Product
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p>Error loading products. Please try again later.</p>
            <Button 
              onClick={() => refetch()} 
              variant="secondary"
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        ) : sortedProducts.length === 0 ? (
          <EmptyState 
            onAddClick={() => dispatch(openAddModal())} 
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>
      
      
      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => dispatch(closeAddModal())}
        title="Add New Product"
      >
        <ProductForm 
          onSubmit={handleAddProduct} 
          onCancel={() => dispatch(closeAddModal())}
        />
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => dispatch(closeDeleteModal())}
        onConfirm={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductsPage;