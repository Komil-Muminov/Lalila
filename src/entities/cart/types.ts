import { Product } from "../product";

export interface CartItem extends Product {
	quantity: number;
	selectedSize?: string;
}

export interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product, size?: string) => void;
	removeFromCart: (productId: string) => void;
	increaseQuantity: (productId: string, size?: string) => void;
	decreaseQuantity: (productId: string, size?: string) => void;
	total: number;
}
