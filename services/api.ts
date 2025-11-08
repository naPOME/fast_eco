import axios from "axios";
import { Product, ProductsResponse, CreateProductData, UpdateProductData } from "@/types/product";

const API_BASE_URL = "https://dummyjson.com";

export const productApi = {
  // Fetch products with pagination
  getProducts: async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Search products
  searchProducts: async (query: string, limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    return response.data;
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Create product
  createProduct: async (data: CreateProductData): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/products/add`, data);
    return response.data;
  },

  // Update product
  updateProduct: async (id: number, data: Partial<CreateProductData>): Promise<Product> => {
    const response = await axios.patch(`${API_BASE_URL}/products/${id}`, data);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: number): Promise<{ id: number; isDeleted: boolean }> => {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Get categories
  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string, limit: number = 10, skip: number = 0) => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`);
    return response.data;
  },
};