import {
	useQuery,
	UseQueryOptions,
	UseQueryResult,
	useMutation,
	UseMutationOptions,
	useQueryClient,
	MutationFunction,
} from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { tokenControl } from "../config/tokenControl";
import { _axios } from "../config";
import apiClient from "./client";

// =================================================================
// 1. УНИВЕРСАЛЬНЫЙ GET ХУК (useGetQuery)
// =================================================================

interface IUseGetQueryOptions<TRequest = any, TResponse = any, TSelect = any> {
	url: string;
	method?: "GET" | "POST";
	params?: TRequest;
	useToken?: boolean; // Опция для добавления токена
	options?: Partial<UseQueryOptions<TResponse, unknown, TSelect>>;
}

/**
 * Хук для запросов данных (GET/POST) с поддержкой токена и параметров
 */
export const useGetQuery = <
	TRequest = any,
	TResponse = any,
	TSelect = TResponse,
>(
	options: IUseGetQueryOptions<TRequest, TResponse, TSelect>,
) => {
	const {
		url,
		params,
		method = "POST",
		useToken = false,
		options: queryOptions,
	} = options;

	const queryFn = useCallback(async () => {
		const headers: Record<string, string> = {};

		if (useToken) {
			const token = tokenControl.get();
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}
		}

		const response = await _axios<TResponse>(url, {
			method,
			headers,
			[method === "POST" ? "data" : "params"]: params ?? {},
		});

		return response.data;
	}, [url, params, useToken, method]);

	return useQuery({
		queryFn,
		queryKey: [url, params, useToken, method],
		...queryOptions,
	}) as UseQueryResult<TSelect, unknown>;
};

// =================================================================
// 2. УНИВЕРСАЛЬНЫЙ MUTATION ХУК (useMutationQuery) - ИСПРАВЛЕНО
// =================================================================

interface IUseMutationQueryOptions<TRequest = any, TResponse = any> {
	url: string;
	method: "POST" | "PUT" | "DELETE";
	messages?: {
		success?: string;
		error?: string;
		invalidate?: string[];
		cb?: (data: TResponse) => void;
	};
	queryParams?: Record<string, any>;
	queryOptions?: UseMutationOptions<TResponse, unknown, TRequest, unknown>;
}

/**
 * Хук для мутаций (POST/PUT/DELETE) с поддержкой уведомлений и инвалидации
 */
export const useMutationQuery = <TRequest = any, TResponse = any>(
	options: IUseMutationQueryOptions<TRequest, TResponse>,
) => {
	const { url, method, messages, queryParams, queryOptions } = options;

	const queryClient = useQueryClient();

	const mutationFn: MutationFunction<TResponse, TRequest> = useCallback(
		async (data: TRequest) => {
			const response = await _axios<TResponse>({
				url,
				method,
				data,
				params: queryParams || undefined,
				suppressErrorToast: Boolean(messages?.error),
			} as any);

			return response.data;
		},
		[url, method, queryParams],
	);

	return useMutation({
		mutationFn,
		...queryOptions,
		onSuccess: (data, variables, context, mutation) => {
			// 1. Показ тоста об успехе
			if (messages?.success) {
				toast.success(messages.success);
			}

			// 2. Вызов пользовательского callback
			messages?.cb?.(data);

			// 3. Вызов onSuccess из переданных опций
			queryOptions?.onSuccess?.(data, variables, context, mutation);

			// 4. Инвалидация и повторный запрос (refetch) ключей
			if (messages?.invalidate) {
				queryClient.invalidateQueries({ queryKey: messages.invalidate });
				queryClient.refetchQueries({ queryKey: messages.invalidate });
			}
		},
		onError: (error: any, variables, context, mutation) => {
			let errorMessage = "Произошла ошибка";

			// 1. Извлечение сообщения об ошибке из ответа API
			if (error?.response?.data?.Message) {
				errorMessage = error.response.data.Message;
			} else if (error?.response?.data?.message) {
				errorMessage = error.response.data.message;
			} else if (error?.message) {
				errorMessage = error.message;
			}

			// 2. Показ тоста об ошибке (только если не передан пользовательский error message)
			if (!messages?.error) {
				toast.error(errorMessage);
			}

			// 3. Вызов onError из переданных опций
			queryOptions?.onError?.(error, variables, context, mutation);
		},
	});
};

