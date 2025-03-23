// src/features/products/productsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductFormData, SortOption } from '../types/Product';
import { Comment, CommentFormData } from '../types/Comment';

// Define the base URL for your MongoDB API server
const BASE_URL = import.meta.env.BACK_URL || 'http://localhost:5000/api';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Products', 'Comments'],
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
      transformResponse: (response: any[]) => {
        // Transform MongoDB _id to id if needed
        return response.map(product => ({
          ...product,
          id: product.id || product._id,
          comments: product.comments?.map((comment: any) => ({
            ...comment,
            id: comment.id || comment._id
          })) || []
        }));
      }
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
      transformResponse: (response: any) => {
        // Transform MongoDB _id to id if needed
        return {
          ...response,
          id: response.id || response._id,
          comments: response.comments?.map((comment: any) => ({
            ...comment,
            id: comment.id || comment._id
          })) || []
        };
      }
    }),

    addProduct: builder.mutation<Product, ProductFormData>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
      transformResponse: (response: any) => {
        // Transform MongoDB _id to id if needed
        return {
          ...response,
          id: response.id || response._id,
          comments: response.comments || []
        };
      }
    }),

    updateProduct: builder.mutation<Product, Partial<Product> & { id: number | string }>({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
      transformResponse: (response: any) => {
        // Transform MongoDB _id to id if needed
        return {
          ...response,
          id: response.id || response._id,
          comments: response.comments?.map((comment: any) => ({
            ...comment,
            id: comment.id || comment._id
          })) || []
        };
      }
    }),

    deleteProduct: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // Comments endpoints
    getProductComments: builder.query<Comment[], string>({
      query: (productId) => `/comments/product/${productId}`,
      providesTags: (result, error, productId) => [
        { type: 'Comments', id: productId }
      ],
      transformResponse: (response: any[]) => {
        // Transform MongoDB _id to id if needed
        return response.map(comment => ({
          ...comment,
          id: comment.id || comment._id
        }));
      }
    }),

    addComment: builder.mutation<Comment, CommentFormData>({
      query: (comment) => {
        const now = new Date();
        const formattedDate = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;
        
        return {
          url: '/comments',
          method: 'POST',
          body: {
            ...comment,
            date: formattedDate,
          },
        };
      },
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Products', id: productId },
        { type: 'Comments', id: productId }
      ],
      transformResponse: (response: any) => {
        // Transform MongoDB _id to id if needed
        return {
          ...response,
          id: response.id || response._id
        };
      }
    }),

    deleteComment: builder.mutation<void, { commentId: number | string; productId: number | string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Products', id: productId },
        { type: 'Comments', id: productId }
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = productsApi;