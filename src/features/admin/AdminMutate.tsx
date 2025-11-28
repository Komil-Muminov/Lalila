import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/en/product";
import { X, Check } from "lucide-react";
import { useMutationQuery, useTheme } from "@/shared";
import { ThemeType } from "@/entities";

interface IProps {
	isOpen: boolean;
	isCreating: boolean;
	editingProduct: Product | null;
	onClose: () => void;
}

export const AdminMutate: React.FC<IProps> = ({
	isOpen,
	isCreating,
	editingProduct,
	onClose,
}) => {
	const { theme } = useTheme();

	const [formData, setFormData] = useState<Partial<Product>>({
		name: "",
		price: 0,
		description: "",
		category: "Одежда",
		shape: "box",
		color: "#ffffff",
		inStock: true,
		sizes: ["S", "M", "L"],
	});

	const createMutation = useMutationQuery<Omit<Product, "id">, Product>({
		url: "/products",
		method: "POST",
		messages: {
			success: "Товар создан",
			error: "Ошибка создания",
			invalidate: ["/products"],
			cb: () => onClose(),
		},
	});

	const updateMutation = useMutationQuery<
		{ id: string; data: Partial<Product> },
		Product
	>({
		url: "/products",
		method: "PUT",
		messages: {
			success: "Товар обновлен",
			error: "Ошибка обновления",
			invalidate: ["/products"],
			cb: () => onClose(),
		},
	});

	useEffect(() => {
		if (editingProduct) {
			setFormData(editingProduct);
		} else if (isCreating) {
			setFormData({
				name: "",
				price: 0,
				description: "",
				category: "Одежда",
				shape: "box",
				color: "#ffffff",
				inStock: true,
				sizes: ["S", "M", "L"],
			});
		}
	}, [editingProduct, isCreating]);

	const handleSave = () => {
		if (editingProduct && editingProduct.id) {
			updateMutation.mutate({
				id: editingProduct.id,
				data: formData,
			});
		} else {
			createMutation.mutate(formData as Omit<Product, "id">);
		}
	};

	const isPending = createMutation.isPending || updateMutation.isPending;

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				className={`w-full max-w-2xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${
					theme === ThemeType.SOFT
						? "bg-[#E3D5CA] text-[#292524]"
						: "bg-[#1a1a1a] text-white border border-white/10"
				}`}
			>
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold">
						{isCreating ? "Создать товар" : "Редактировать товар"}
					</h2>
					<button
						onClick={onClose}
						className="p-2 hover:bg-white/10 rounded-full transition"
						disabled={isPending}
					>
						<X size={20} />
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="col-span-2">
						<label className="block text-xs font-bold uppercase mb-2 opacity-70">
							Название
						</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className="w-full p-3 rounded-lg outline-none bg-transparent border border-current opacity-80"
							disabled={isPending}
						/>
					</div>

					<div>
						<label className="block text-xs font-bold uppercase mb-2 opacity-70">
							Цена ($)
						</label>
						<input
							type="number"
							value={formData.price}
							onChange={(e) =>
								setFormData({
									...formData,
									price: parseFloat(e.target.value),
								})
							}
							className="w-full p-3 rounded-lg outline-none bg-transparent border border-current opacity-80"
							disabled={isPending}
						/>
					</div>

					<div>
						<label className="block text-xs font-bold uppercase mb-2 opacity-70">
							Цвет
						</label>
						<input
							type="color"
							value={formData.color}
							onChange={(e) =>
								setFormData({ ...formData, color: e.target.value })
							}
							className="w-full h-12 rounded-lg cursor-pointer"
							disabled={isPending}
						/>
					</div>

					<div className="col-span-2">
						<label className="block text-xs font-bold uppercase mb-2 opacity-70">
							Описание
						</label>
						<textarea
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={3}
							className="w-full p-3 rounded-lg outline-none bg-transparent border border-current opacity-80"
							disabled={isPending}
						/>
					</div>
				</div>

				<div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/10">
					<button
						onClick={onClose}
						className="px-6 py-3 rounded-lg font-bold opacity-60 hover:opacity-80 transition"
						disabled={isPending}
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						disabled={isPending}
						className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition ${
							theme === ThemeType.SOFT
								? "bg-[#292524] text-[#E3D5CA]"
								: "bg-pink-600 text-white"
						} ${
							isPending ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
						}`}
					>
						<Check size={18} />
						{isPending ? "Сохранение..." : "Сохранить"}
					</button>
				</div>
			</motion.div>
		</div>
	);
};
