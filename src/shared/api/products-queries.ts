import type { Product } from "@/entities/product";
import { useGetQuery, usePostMutation } from "./hooks";

/**
 * Fetch all products
 */
export const useProducts = () => {
	return useGetQuery<Product[]>("/products", undefined, ["products"]);
};

/**
 * Fetch product by ID
 */
export const useProduct = (id: string | null | undefined) => {
	return useGetQuery<Product>("/products", id || undefined, ["product", id]);
};

/**
 * Create new product
 */
export const useCreateProduct = () => {
	return usePostMutation<Product, Omit<Product, "id">>("/products", [
		"products",
	]);
};
