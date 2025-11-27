import { Product } from "../product";

export interface CartItem extends Product {
	quantity: number;
	selectedSize?: string;
}

export interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product, size?: string) => void;
	removeFromCart: (productId: string) => void;
	total: number;
}
