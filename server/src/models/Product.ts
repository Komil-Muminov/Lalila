import mongoose, { Schema, Document } from "mongoose";
import type { IProduct } from "../types/index.js";

export interface IProductDocument extends Omit<IProduct, "_id">, Document {
	_id: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema<IProductDocument>(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		category: {
			type: String,
			required: true,
			enum: ["Одежда", "Электроника", "Аксессуары", "Для дома"],
		},
		shape: {
			type: String,
			required: true,
			enum: ["box", "sphere", "torus"],
			default: "box",
		},
		color: { type: String, required: true, default: "#ffffff" },
		sizes: [{ type: String }],
		inStock: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<IProductDocument>("Product", ProductSchema);
