import { api } from './api';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>(`/category/${category}`);
  return response.data.products;
};

export const getProductById = async (id: number | string): Promise<Product> => {
  const response = await api.get<Product>(`/${id}`);
  return response.data;
};
