import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./client";
import type { IProduct } from "@/types";

// Fetch all products
export const useProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const response = await apiClient.get<{ data: IProduct[] }>("/products");
			return response.data.data;
		},
	});
};

// Fetch product by ID
export const useProduct = (id: string | undefined) => {
	return useQuery({
		queryKey: ["product", id],
		queryFn: async () => {
			const response = await apiClient.get<{ data: IProduct }>(
				`/products/${id}`,
			);
			return response.data.data;
		},
		enabled: !!id,
	});
};

// Create product
export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newProduct: Omit<IProduct, "_id">) => {
			const response = await apiClient.post<{ data: IProduct }>(
				"/products",
				newProduct,
			);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

// Update product
export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			id,
			product,
		}: {
			id: string;
			product: Partial<IProduct>;
		}) => {
			const response = await apiClient.put<{ data: IProduct }>(
				`/products/${id}`,
				product,
			);
			return response.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

// Delete product
export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await apiClient.delete(`/products/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};
