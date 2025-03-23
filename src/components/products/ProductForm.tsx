
// src/components/products/ProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../../types/Product';
import Button from '../common/Button';
import Input from '../common/Input';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!product;
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    imageUrl: '',
    count: 0,
    size: { width: 0, height: 0 },
    weight: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        imageUrl: product.imageUrl,
        count: product.count,
        size: { ...product.size },
        weight: product.weight,
      });
    }
  }, [product]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (formData.count < 0) {
      newErrors.count = 'Count must be 0 or greater';
    }
    
    if (formData.size.width <= 0) {
      newErrors.width = 'Width must be greater than 0';
    }
    
    if (formData.size.height <= 0) {
      newErrors.height = 'Height must be greater than 0';
    }
    
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'height') {
      setFormData(prev => ({
        ...prev,
        size: {
          ...prev.size,
          [name]: parseInt(value) || 0,
        },
      }));
    } else if (name === 'count') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="name"
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      
      <Input
        id="imageUrl"
        name="imageUrl"
        label="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        error={errors.imageUrl}
        required
      />
      
      <Input
        id="count"
        name="count"
        label="Count in Stock"
        type="number"
        value={formData.count}
        onChange={handleChange}
        error={errors.count}
        required
      />
      
      <div className="flex gap-4">
        <Input
          id="width"
          name="width"
          label="Width"
          type="number"
          value={formData.size.width}
          onChange={handleChange}
          error={errors.width}
          required
        />
        
        <Input
          id="height"
          name="height"
          label="Height"
          type="number"
          value={formData.size.height}
          onChange={handleChange}
          error={errors.height}
          required
        />
      </div>
      
      <Input
        id="weight"
        name="weight"
        label="Weight (e.g., 200g)"
        value={formData.weight}
        onChange={handleChange}
        error={errors.weight}
        required
      />
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
