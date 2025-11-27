import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	fetchProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "@/shared/api";
import { Product } from "@/entities/product";
import { ThemeType } from "@/entities/theme";
import { useTheme } from "@/shared/ui/context";
import {
	Trash2,
	Edit2,
	Plus,
	X,
	Check,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

export const Admin: React.FC = () => {
	const { theme } = useTheme();
	const [products, setProducts] = useState<Product[]>([]);
	const [isEditing, setIsEditing] = useState<Product | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 8;

	const [formData, setFormData] = useState<Partial<Product>>({
		name: "",
		price: 0,
		description: "",
		category: "Одежда",
		shape: "box",
		color: "#ffffff",
		inStock: true,
	});

	const loadProducts = async () => {
		const data = await fetchProducts();
		setProducts(data);
	};

	useEffect(() => {
		loadProducts();
	}, []);

	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
	const displayedProducts = products.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
	}, [products.length, totalPages, currentPage]);

	const handleSave = async () => {
		if (isEditing && isEditing.id) await updateProduct(isEditing.id, formData);
		else await createProduct(formData as Omit<Product, "id">);
		setIsEditing(null);
		setIsCreating(false);
		loadProducts();
	};

	const handleDelete = async (id: string) => {
		if (window.confirm("Вы уверены?")) {
			await deleteProduct(id);
			loadProducts();
		}
	};

	const openEdit = (product: Product) => {
		setIsEditing(product);
		setFormData(product);
		setIsCreating(false);
	};
	const openCreate = () => {
		setIsEditing(null);
		setIsCreating(true);
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
	};

	const getContainerClass = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/90 border border-[#D4C3B5] shadow-lg text-[#292524]";
		if (theme === ThemeType.MINIMAL)
			return "bg-white border border-gray-200 shadow-lg text-gray-900";
		return "bg-black/30 backdrop-blur-xl border border-white/10 text-white shadow-2xl";
	};

	return (
		<div className="min-h-screen pt-24 px-4 md:px-12 pb-12 w-full">
			<div className="max-w-7xl mx-auto w-full">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
					<div>
						<h1 className="text-4xl font-display font-bold">Инвентарь</h1>
						<p className="opacity-60 mt-1">
							Управление каталогом (Всего: {products.length})
						</p>
					</div>
					<button
						onClick={openCreate}
						className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg ${
							theme === ThemeType.SOFT
								? "bg-[#292524] text-[#E3D5CA]"
								: "bg-pink-600 text-white"
						}`}
					>
						<Plus size={18} /> Добавить товар
					</button>
				</div>

				{(isEditing || isCreating) && (
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
									onClick={() => {
										setIsEditing(null);
										setIsCreating(false);
									}}
									className="p-2 hover:bg-white/10 rounded-full"
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
									/>
								</div>
							</div>
							<div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/10">
								<button
									onClick={() => {
										setIsEditing(null);
										setIsCreating(false);
									}}
									className="px-6 py-3 rounded-lg font-bold opacity-60"
								>
									Cancel
								</button>
								<button
									onClick={handleSave}
									className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 ${
										theme === ThemeType.SOFT
											? "bg-[#292524] text-[#E3D5CA]"
											: "bg-pink-600 text-white"
									}`}
								>
									<Check size={18} /> Сохранить
								</button>
							</div>
						</motion.div>
					</div>
				)}

				<div
					className={`w-full overflow-hidden rounded-2xl ${getContainerClass()}`}
				>
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="text-xs uppercase tracking-wider bg-black/5">
								<th className="p-4 pl-6 font-bold">Товар</th>
								<th className="p-4 font-bold">Цена</th>
								<th className="p-4 font-bold text-right pr-6">Действия</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-white/5">
							{displayedProducts.map((product) => (
								<tr key={product.id} className="hover:bg-black/5">
									<td className="p-4 pl-6">
										<div className="flex items-center gap-4">
											<div
												className="w-10 h-10 rounded-md shadow-inner"
												style={{ backgroundColor: product.color }}
											></div>
											<div className="font-bold">{product.name}</div>
										</div>
									</td>
									<td className="p-4 font-mono font-medium">
										${product.price.toFixed(2)}
									</td>
									<td className="p-4 text-right pr-6">
										<button
											onClick={() => openEdit(product)}
											className="p-2 mr-2"
										>
											<Edit2 size={16} />
										</button>
										<button
											onClick={() => handleDelete(product.id)}
											className="p-2 text-red-500"
										>
											<Trash2 size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="p-4 border-t border-white/10 flex justify-between items-center">
						<div className="text-xs font-bold opacity-50 ml-2">
							Страница {currentPage} из {totalPages}
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className="p-2 rounded-lg hover:bg-black/5"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
								className="p-2 rounded-lg hover:bg-black/5"
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
