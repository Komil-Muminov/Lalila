
export enum ThemeType {
  GLASS = 'glass',
  AMOLED = 'amoled',
  MINIMAL = 'minimal',
  SOFT = 'soft'
}

export type ProductCategory = 'Apparel' | 'Electronics' | 'Accessories' | 'Home';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  category: ProductCategory;
  shape: 'box' | 'sphere' | 'torus';
  sizes?: string[]; // e.g. ['S', 'M', 'L'] or ['256GB', '512GB']
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  total: number;
}
