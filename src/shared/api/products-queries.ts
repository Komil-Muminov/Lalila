import type { Product } from "@/en/product";
// Импортируем именно ваши универсальные хуки
import { useGetQuery, useMutationQuery } from "./hooks";

/**
 * Fetch all products
 */
export const useProducts = () => {
	// 1. Используем useGetQuery для списка продуктов (GET)
	return useGetQuery<void, Product[]>({
		url: "/products",
		method: "GET", // Явно указываем GET
		options: {
			queryKey: ["products"],
		},
	});
};

/**
 * Fetch product by ID
 */
export const useProduct = (id: string | null | undefined) => {
	// 2. Используем useGetQuery для одного продукта (GET)
	return useGetQuery<void, Product>({
		// Используем интерполяцию для формирования URL с ID
		url: `/products/${id}`,
		method: "GET",
		options: {
			// Ключ запроса для кэширования
			queryKey: ["product", id],
			// Запрос будет выполнен, только если ID существует
			enabled: !!id,
		},
	});
};

/**
 * Create new product
 * (Используем useMutationQuery, как вы и просили)
 */
export const useCreateProduct = () => {
	return useMutationQuery<Omit<Product, "id">, Product>({
		url: "/create/products",
		method: "POST",
		messages: {
			success: "Продукт успешно добавлен!",
			invalidate: ["products"],
		},
	});
};
