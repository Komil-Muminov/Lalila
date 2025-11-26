import { Request, Response } from "express";
import Product from "../models/Product.js";
import type { IProduct, IApiResponse } from "../types/index.js";

// Get all products
export const getAllProducts = async (
	req: Request,
	res: Response<IApiResponse<IProduct[]>>,
) => {
	try {
		const products = await Product.find();
		res.json({
			success: true,
			data: products,
			message: "Products retrieved successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to fetch products",
		});
	}
};

// Get product by ID
export const getProductById = async (
	req: Request<{ id: string }>,
	res: Response<IApiResponse<IProduct>>,
) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}
		res.json({
			success: true,
			data: product,
			message: "Product retrieved successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Failed to fetch product",
		});
	}
};

// Create product
export const createProduct = async (
	req: Request<{}, {}, IProduct>,
	res: Response<IApiResponse<IProduct>>,
) => {
	try {
		const newProduct = new Product(req.body);
		const savedProduct = await newProduct.save();
		res.status(201).json({
			success: true,
			data: savedProduct,
			message: "Product created successfully",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Failed to create product",
		});
	}
};

// Update product
export const updateProduct = async (
	req: Request<{ id: string }, {}, Partial<IProduct>>,
	res: Response<IApiResponse<IProduct>>,
) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
		);
		if (!updatedProduct) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}
		res.json({
			success: true,
			data: updatedProduct,
			message: "Product updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Failed to update product",
		});
	}
};

// Delete product
export const deleteProduct = async (
	req: Request<{ id: string }>,
	res: Response<IApiResponse<null>>,
) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}
		res.json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Failed to delete product",
		});
	}
};
