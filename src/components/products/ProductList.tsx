
// src/components/products/ProductList.tsx
import React, { useState } from 'react';
import { Product, SortOption } from '../../types/Product';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import Modal from '../common/Modal';
import ProductForm from './ProductForm';
import SortDropdown from './SortDropdown';
import DeleteConfirmation from './DeleteConfirmation';
import EmptyState from './EmptyState';
import { PlusIcon } from '@heroicons/react/24/solid';
import { ProductFormData } from '../../types/Product';

interface ProductListProps {
  products: Product[];
  sortOption: SortOption;
  onChangeSortOption: (option: SortOption) => void;
  onAddProduct: (product: ProductFormData) => void;
  onDeleteProduct: (id: number) => void;
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  sortOption,
  onChangeSortOption,
  onAddProduct,
  onDeleteProduct,
  loading,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  // Sort products based on sortOption
  const sortProducts = (products: Product[], option: SortOption): Product[] => {
    return [...products].sort((a, b) => {
      switch (option) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'count-asc':
          return a.count - b.count;
        case 'count-desc':
          return b.count - a.count;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const sortedProducts = sortProducts(products, sortOption);

  const handleDelete = (id: number) => {
    setDeleteProductId(id);
  };

  const confirmDelete = () => {
    if (deleteProductId !== null) {
      onDeleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <div className="flex items-center gap-4">
          <SortDropdown value={sortOption} onChange={onChangeSortOption} />
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState onAddClick={() => setIsAddModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <Modal
        title="Add New Product"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <ProductForm
          onSubmit={(data) => {
            onAddProduct(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={deleteProductId !== null}
        onClose={() => setDeleteProductId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductList;
