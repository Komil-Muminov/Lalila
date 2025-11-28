import React, { useState } from "react";
import { Product } from "@/en/product";
import { Edit2, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useMutationQuery, useTheme } from "@/shared";
import { ThemeType } from "@/entities";

interface IProps {
	products: Product[];
	onEdit: (product: Product) => void;
	onDelete: (id: string) => void;
	onCreate: () => void;
}

export const AdminList: React.FC<IProps> = ({
	products,
	onEdit,
	onDelete,
	onCreate,
}) => {
	const { theme } = useTheme();
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 8;

	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
	const displayedProducts = products.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const deleteMutation = useMutationQuery<{ id: string }, void>({
		url: "/products",
		method: "DELETE",
		messages: {
			success: "Товар удален",
			error: "Ошибка удаления",
			invalidate: ["/products"],
		},
	});

	const handleDelete = (id: string) => {
		if (window.confirm("Вы уверены?")) {
			deleteMutation.mutate({ id });
			onDelete(id);
		}
	};

	const getCardClass = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/90 border border-[#D4C3B5] shadow-lg text-[#292524] hover:shadow-xl";
		if (theme === ThemeType.MINIMAL)
			return "bg-white border border-gray-200 shadow-lg text-gray-900 hover:shadow-xl";
		return "bg-black/30 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-black/40";
	};

	const getContainerClass = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/50 border border-[#D4C3B5]";
		if (theme === ThemeType.MINIMAL) return "bg-gray-50 border border-gray-200";
		return "bg-black/20 border border-white/10";
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
						onClick={onCreate}
						className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg ${
							theme === ThemeType.SOFT
								? "bg-[#292524] text-[#E3D5CA]"
								: "bg-pink-600 text-white"
						}`}
					>
						<Plus size={18} /> Добавить товар
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{displayedProducts.map((product: any) => (
						<div
							key={product.id}
							className={`rounded-2xl p-6 transition-all duration-300 ${getCardClass()}`}
						>
							<div className="flex flex-col h-full">
								<div
									className="w-full h-32 rounded-xl mb-4 shadow-inner"
									style={{ backgroundColor: product.color }}
								></div>

								<div className="flex-1">
									<h3 className="text-lg font-bold mb-2 line-clamp-2">
										{product.name}
									</h3>
									<p className="text-2xl font-mono font-bold mb-3">
										${product.price.toFixed(2)}
									</p>
									{product.description && (
										<p className="text-sm opacity-60 line-clamp-2 mb-4">
											{product.description}
										</p>
									)}
								</div>

								<div className="flex gap-2 mt-4 pt-4 border-t border-current/10">
									<button
										onClick={() => onEdit(product)}
										className={`flex-1 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 ${
											theme === ThemeType.SOFT
												? "bg-[#292524] text-[#E3D5CA]"
												: "bg-blue-500 text-white"
										}`}
									>
										<Edit2 size={16} />
										Edit
									</button>
									<button
										onClick={() => handleDelete(product.id)}
										disabled={deleteMutation.isPending}
										className="px-4 py-2 rounded-lg font-medium bg-red-500 text-white flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Trash2 size={16} />
										{deleteMutation.isPending ? "..." : "Delete"}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{products.length > ITEMS_PER_PAGE && (
					<div
						className={`mt-8 p-4 rounded-2xl flex justify-between items-center ${getContainerClass()}`}
					>
						<div className="text-sm font-bold opacity-60">
							Страница {currentPage} из {totalPages}
						</div>
						<div className="flex gap-2">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className={`p-3 rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 ${
									theme === ThemeType.SOFT
										? "bg-[#292524] text-[#E3D5CA]"
										: "bg-pink-600 text-white"
								}`}
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								disabled={currentPage === totalPages}
								className={`p-3 rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 ${
									theme === ThemeType.SOFT
										? "bg-[#292524] text-[#E3D5CA]"
										: "bg-pink-600 text-white"
								}`}
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
