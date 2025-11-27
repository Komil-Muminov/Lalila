import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryOptions,
	UseMutationOptions,
} from "@tanstack/react-query";
import apiClient from "./client";

/**
 * Generic GET query hook for fetching data
 * @param endpoint - API endpoint path
 * @param id - Optional ID to append to endpoint
 * @param queryKey - React Query key
 * @param options - Additional useQuery options
 */
export function useGetQuery<T>(
	endpoint: string,
	id?: string | null | undefined,
	queryKey?: (string | null | undefined)[],
	options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">,
) {
	const finalEndpoint = id ? `${endpoint}/${id}` : endpoint;
	const finalKey = queryKey || [endpoint, id];

	return useQuery<T>({
		queryKey: finalKey,
		queryFn: async () => {
			const response = await apiClient.get<{ data: T }>(finalEndpoint);
			return response.data.data;
		},
		enabled: id ? !!id : true,
		...options,
	});
}

/**
 * Generic POST mutation hook
 * @param endpoint - API endpoint path
 * @param invalidateKeys - Query keys to invalidate on success
 * @param options - Additional useMutation options
 */
export function usePostMutation<TData, TVariables = unknown>(
	endpoint: string,
	invalidateKeys?: string[],
	options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
) {
	const queryClient = useQueryClient();

	return useMutation<TData, Error, TVariables>({
		mutationFn: async (data: TVariables) => {
			const response = await apiClient.post<{ data: TData }>(endpoint, data);
			return response.data.data;
		},
		onSuccess: () => {
			if (invalidateKeys && invalidateKeys.length > 0) {
				invalidateKeys.forEach((key) => {
					queryClient.invalidateQueries({ queryKey: [key] });
				});
			}
		},
		...options,
	});
}
