export enum ThemeType {
	GLASS = "glass",
	AMOLED = "amoled",
	MINIMAL = "minimal",
	SOFT = "soft",
}

export type ProductCategory =
	| "Одежда"
	| "Электроника"
	| "Аксессуары"
	| "Для дома";

export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	color: string;
	category: ProductCategory;
	shape: "box" | "sphere" | "torus";
	sizes?: string[];
	inStock: boolean;
}

export interface IProduct {
	_id?: string;
	name: string;
	price: number;
	description: string;
	category: "Одежда" | "Электроника" | "Аксессуары" | "Для дома";
	shape: "box" | "sphere" | "torus";
	color: string;
	sizes: string[];
	inStock: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

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

export interface ThemeContextType {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
}
