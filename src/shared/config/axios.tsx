import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { tokenControl } from "./tokenControl";
import { toast } from "react-toastify";
import { AppRoutes } from "./AppRoutes";
import { queryClient } from "./queryClient";

// Инициализация Axios: используем VITE_API_URL из переменных среды Vite
export const _axios = axios.create({
	// Использовать import.meta.env.VITE_API_URL вместо ENV.API_URL
	baseURL: import.meta.env.VITE_API_URL as string,
});

// --- Интерцептор ЗАПРОСА: Добавление токена ---
_axios.interceptors.request.use(
	(config: InternalAxiosRequestConfig<unknown>) => {
		const token = tokenControl.get();
		// Добавление токена, если он существует
		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}
		config.headers.set("Access-Control-Allow-Origin", "*");

		return config;
	},
);

// --- Тип для конфигурации с дополнительными полями ---

export interface CustomAxiosRequestConfig
	extends InternalAxiosRequestConfig<unknown> {
	suppressErrorToast?: boolean;
	// Тип изменен на string | string[] (или сразу string[] для ясности)
	// В логике ниже мы гарантируем, что это всегда будет массив.
	invalidateQueriesKey?: string | string[];
}

// --- Интерцептор ОТВЕТА: Обработка инвалидации и ошибок ---

_axios.interceptors.response.use(
	async (response) => {
		const config = response.config as CustomAxiosRequestConfig;

		// Если передан ключ для инвалидации — вызываем queryClient.invalidateQueries
		if (config.invalidateQueriesKey) {
			// ⭐ ИСПРАВЛЕНИЕ ОШИБКИ ТИПОВ ⭐
			// queryClient.invalidateQueries ожидает массив для queryKey.
			const keysToInvalidate = Array.isArray(config.invalidateQueriesKey)
				? config.invalidateQueriesKey
				: [config.invalidateQueriesKey]; // Оборачиваем одиночную строку в массив

			await queryClient.invalidateQueries({
				queryKey: keysToInvalidate,
			});
		}

		return response;
	},

	async (error: AxiosError<any>) => {
		const config = error.config as CustomAxiosRequestConfig;

		toast.dismiss();

		if (!config?.suppressErrorToast) {
			await handleBadRequestErrors(error);
		}

		return Promise.reject(error);
	},
);

// --- Функция обработки ошибок ---

const handleBadRequestErrors = async (error: AxiosError) => {
	const response = error.response;

	if (!response) return;

	const { status, data } = response;

	const message =
		typeof data === "object" && data !== null && "Message" in data
			? (data as any).Message
			: "Произошла ошибка при запросе";

	if (status === 401) {
		toast.error("Пользователь не авторизован");
		tokenControl.remove();
		// ⭐ ПРИМЕЧАНИЕ: Рекомендуется заменить window.location.href
		// на метод навигации из вашего роутера (например, useNavigate()),
		// чтобы избежать полной перезагрузки страницы.
		window.location.href = AppRoutes.MAIN;
	} else if (status === 404) {
		toast.error(message || "Данные не найдены");
	} else if (status >= 400) {
		toast.error(message);
	}
};

export {};
