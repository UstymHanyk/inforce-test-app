export interface Size {
  width: number;
  height: number;
}

export interface Product {
  id: number || string;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export type ProductFormData = Omit<Product, 'id' | 'comments' | 'createdAt' | 'updatedAt'>;

export type SortOption = 'name-asc' | 'name-desc' | 'count-asc' | 'count-desc';

