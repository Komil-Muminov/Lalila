import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

// Simulating database state in memory for the session
let dbProducts = [...MOCK_PRODUCTS];

const DELAY = 600;

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dbProducts);
    }, DELAY);
  });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dbProducts.find(p => p.id === id));
    }, DELAY);
  });
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
      dbProducts = [...dbProducts, newProduct];
      resolve(newProduct);
    }, DELAY);
  });
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = dbProducts.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error('Product not found'));
        return;
      }
      dbProducts[index] = { ...dbProducts[index], ...updates };
      resolve(dbProducts[index]);
    }, DELAY);
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dbProducts = dbProducts.filter(p => p.id !== id);
      resolve();
    }, DELAY);
  });
};