import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useGetProductByIdQuery, 
  useUpdateProductMutation,
  useAddCommentMutation,
  useDeleteCommentMutation
} from '../services/productsApi';
import { 
  openEditModal, 
  closeEditModal, 
  selectIsEditModalOpen 
} from '../store/slices/productSlice';
import {
  openAddCommentModal,
  closeAddCommentModal,
  openDeleteCommentModal,
  closeDeleteCommentModal,
  selectIsAddCommentModalOpen,
  selectIsDeleteCommentModalOpen,
  selectSelectedCommentId
} from '../store/slices/commentSlice';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import ProductForm from '../components/products/ProductForm'; 
import CommentForm from '../components/comments/CommentForm';
import DeleteConfirmation from '../components/products/DeleteConfirmation';
import CommentList from '../components/comments/CommentList';
import Loader from '../components/common/Loader';
import { ProductFormData } from '../types/Product';
import { CommentFormData } from '../types/Comment';

const ProductViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux state
  const isEditModalOpen = useSelector(selectIsEditModalOpen);
  const isAddCommentModalOpen = useSelector(selectIsAddCommentModalOpen);
  const isDeleteCommentModalOpen = useSelector(selectIsDeleteCommentModalOpen);
  const selectedCommentId = useSelector(selectSelectedCommentId);
  
  // RTK Query hooks
  const { 
    data: product, 
    isLoading, 
    isError 
  } = useGetProductByIdQuery(id || '', { skip: !id });
  
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  
  // Handle update product
  const handleUpdateProduct = async (productData: ProductFormData) => {
    if (id) {
      try {
        await updateProduct({ 
          id, 
          ...productData 
        }).unwrap();
        dispatch(closeEditModal());
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };
  
  // Handle add comment
  const handleAddComment = async (commentData: CommentFormData) => {
    if (id) {
      try {
        await addComment({
          productId: id,
          description: commentData.description
        }).unwrap();
        dispatch(closeAddCommentModal());
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };
  
  // Handle delete comment
  const handleDeleteComment = async () => {
    if (id && selectedCommentId) {
      try {
        await deleteComment({
          commentId: selectedCommentId,
          productId: parseInt(id)
        }).unwrap();
        dispatch(closeDeleteCommentModal());
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  };

  // Handle comment deletion from list
  const handleCommentDelete = (productId: number, commentId: number) => {
    dispatch(openDeleteCommentModal(commentId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center">
          <Loader />
        </main>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">Product not found</h2>
            <p className="mb-4">The product you're looking for doesn't exist or couldn't be loaded.</p>
            <Button 
              onClick={() => navigate('/products')} 
              variant="primary"
            >
              Back to Products
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Product Details Section */}
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/3 bg-gray-100">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400?text=No+Image';
                }}
              />
            </div>
            
            {/* Product Info */}
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <Button 
                  onClick={() => dispatch(openEditModal())} 
                  variant="secondary"
                >
                  Edit Product
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">Inventory</h3>
                  <p className="text-lg font-medium text-gray-900">{product.count} in stock</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">Weight</h3>
                  <p className="text-lg font-medium text-gray-900">{product.weight}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-500 uppercase tracking-wide">Dimensions</h3>
                  <p className="text-lg font-medium text-gray-900">{product.size.width} × {product.size.height}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
              <Button 
                onClick={() => dispatch(openAddCommentModal())} 
                variant="primary"
              >
                Add Comment
              </Button>
            </div>
            
            {product.comments && product.comments.length > 0 ? (
              <CommentList 
                comments={product.comments}
                productId={parseInt(id as string)}
                onDelete={handleCommentDelete}
              />
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      
      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => dispatch(closeEditModal())}
        title="Edit Product"
      >
        <ProductForm 
          product={product}
          onSubmit={handleUpdateProduct} 
          onCancel={() => dispatch(closeEditModal())}
        />
      </Modal>
      
      {/* Add Comment Modal */}
      <Modal
        isOpen={isAddCommentModalOpen}
        onClose={() => dispatch(closeAddCommentModal())}
        title="Add Comment"
      >
        <CommentForm 
          productId={parseInt(id as string)}
          onSubmit={handleAddComment}
        />
      </Modal>
      
      {/* Delete Comment Confirmation */}
      <DeleteConfirmation
        isOpen={isDeleteCommentModalOpen}
        onClose={() => dispatch(closeDeleteCommentModal())}
        onConfirm={handleDeleteComment}
      />
    </div>
  );
};

export default ProductViewPage;