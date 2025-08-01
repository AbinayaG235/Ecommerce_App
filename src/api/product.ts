import axios from 'axios';
import { Product } from '../redux/types';

const BASE_API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_API_URL}/products`);
    return response.data;
  } catch (error: any) {
    console.error('API Call: Error fetching products:', error.message);
    if (error.response) {
      console.error('Status:', error.Status);
      console.error('Data:', error);
     } 
     
    //else if (error.request) {
    //   console.error('No response received:', error.request);
    // }
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${BASE_API_URL}/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`API Call: Error fetching product with ID ${id}:`, error.message);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${BASE_API_URL}/products/categories`);
    return response.data;
  } catch (error: any) {
    console.error('API Call: Error fetching categories:', error.message);
    throw error;
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${BASE_API_URL}/products/category/${category}`);
    return response.data;
  } catch (error: any) {
    console.error(`API Call: Error fetching products for category "${category}":`, error.message);
    throw error;
  }
};