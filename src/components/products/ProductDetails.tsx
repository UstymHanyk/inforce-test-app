
// src/components/products/ProductDetails.tsx
import React, { useState } from 'react';
import { Product, ProductFormData } from '../../types/Product';
import { Comment, CommentFormData } from '../../types/Comment';

import Button from '../common/Button';
import Modal from '../common/Modal';
import ProductForm from './ProductForm';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface ProductDetailsProps {
  product: Product;
  onUpdateProduct: (id: number, data: ProductFormData) => void;
  onAddComment: (comment: CommentFormData) => void;
  onDeleteComment: (productId: number, commentId: number) => void;
  loading: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onUpdateProduct,
  onAddComment,
  onDeleteComment,
  loading,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/3">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300?text=No+Image';
              }}
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <Button
                variant="ghost"
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-1"
              >
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Inventory</h3>
                  <p className="mt-1 text-lg font-semibold">{product.count} units</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                  <p className="mt-1 text-lg font-semibold">{product.weight}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                  <p className="mt-1 text-lg font-semibold">{product.size.width} × {product.size.height}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <CommentForm
            productId={product.id}
            onSubmit={onAddComment}
          />
          <div className="mt-6">
            <CommentList

              comments={product.comments}
              productId={product.id}
              onDelete={onDeleteComment}
            />
          </div>
        </div>
      </div>
      
      {/* Edit Product Modal */}
      <Modal
        title="Edit Product"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <ProductForm
          product={product}
          onSubmit={(data) => {
            onUpdateProduct(product.id, data);
            setIsEditModalOpen(false);
          }}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductDetails;
