
// src/components/products/EmptyState.tsx
import React from 'react';
import Button from '../common/Button';
import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddClick }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
      <ShoppingCartIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No products yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by adding your first product.
      </p>
      <div className="mt-6">
        <Button
          onClick={onAddClick}
          className="inline-flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default EmptyState; 