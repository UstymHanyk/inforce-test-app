// src/components/products/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/200'} 
          alt={product.name}
          className="object-contain w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/200?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">In stock: {product.count}</span>
          <span className="text-sm text-gray-500">Weight: {product.weight}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Size: {product.size.width}x{product.size.height}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary" size="sm">View Details</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
