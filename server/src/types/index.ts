import type { ObjectId } from "mongodb";

export interface IProduct {
	_id?: string | ObjectId;
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

export interface IApiResponse<T> {
	success: boolean;
	data?: T;
	message: string;
}
