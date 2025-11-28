import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/en/product";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSkeleton, ProductStage, useCart, useTheme } from "@/shared";
import { ThemeType } from "@/entities";

interface IProps {
	displayedProducts: Product[];
	isLoading: boolean;
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const HomeSection: React.FC<IProps> = ({
	displayedProducts,
	isLoading,
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const { addToCart } = useCart();
	const { theme } = useTheme();

	const getCardStyle = () => {
		if (theme === ThemeType.MINIMAL)
			return "bg-white border border-gray-100 shadow-xl shadow-gray-200/50 text-gray-900";

		if (theme === ThemeType.AMOLED)
			return "bg-gray-900 border border-gray-800 text-white";

		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/70 backdrop-blur-2xl border border-white/60 shadow-xl shadow-[#4A403A]/10 text-[#292524] rounded-[2rem]";

		return "bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl shadow-black/20 ring-1 ring-white/10";
	};

	const getButtonStyle = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]";

		if (theme === ThemeType.MINIMAL)
			return "bg-black text-white hover:bg-gray-800";

		return "bg-white text-black hover:bg-pink-500 hover:text-white";
	};

	const getPaginationBtnStyle = () => {
		if (theme === ThemeType.SOFT)
			return "hover:bg-[#292524]/10 text-[#292524] disabled:text-[#292524]/30";

		if (theme === ThemeType.MINIMAL)
			return "hover:bg-gray-100 text-black disabled:text-gray-300";

		return "hover:bg-white/10 text-white disabled:text-white/30";
	};

	return (
		<div className="max-w-7xl mx-auto w-full flex-grow">
			{/* 🟡 LOADING */}
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
					{Array.from({ length: 8 }).map((_, i) => (
						<ProductSkeleton key={i} />
					))}
				</div>
			)}

			{/* 🟢 LOADED */}
			{!isLoading && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
						{displayedProducts.map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
								className={`relative overflow-hidden group flex flex-col h-[450px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${getCardStyle()}`}
							>
								<Link
									to={`/product/${product.id}`}
									className="block h-3/5 w-full relative cursor-pointer overflow-hidden"
								>
									<div
										className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
											theme === ThemeType.SOFT
												? "bg-[#E3D5CA]/30"
												: "bg-gradient-to-b from-transparent to-black/20"
										}`}
									>
										<ProductStage
											shape={product.shape}
											color={
												theme === ThemeType.SOFT &&
												product.category === "Одежда"
													? "#8d7f76"
													: product.color
											}
											interactive={false}
										/>
									</div>

									{/* ❌ IF заменён */}
									{!product.inStock && (
										<div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
											РАСПРОДАНО
										</div>
									)}
								</Link>

								<div className="p-6 flex-grow flex flex-col justify-between relative z-10">
									<Link to={`/product/${product.id}`}>
										<div className="flex justify-between items-start mb-2">
											<div className="flex-1 pr-2">
												<p
													className={`text-xs font-bold tracking-widest uppercase mb-1 ${
														theme === ThemeType.SOFT
															? "text-[#292524]/60"
															: "text-white/60"
													}`}
												>
													{product.category}
												</p>
												<h3 className="text-xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">
													{product.name}
												</h3>
											</div>
											<span className="text-lg font-bold font-mono">
												${product.price}
											</span>
										</div>
									</Link>

									<div className="mt-4 flex gap-2">
										<button
											onClick={(e) => {
												e.preventDefault();
												if (product.inStock)
													addToCart(product, product.sizes?.[0]);
											}}
											disabled={!product.inStock}
											className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-md active:shadow-none active:translate-y-px ${
												!product.inStock
													? "opacity-50 cursor-not-allowed bg-gray-500 text-white"
													: getButtonStyle()
											}`}
										>
											{product.inStock ? (
												<>
													<Plus size={16} /> Быстро добавить
												</>
											) : (
												"Нет в наличии"
											)}
										</button>

										<Link
											to={`/product/${product.id}`}
											className={`p-3 rounded-xl flex items-center justify-center border transition-colors ${
												theme === ThemeType.SOFT
													? "border-[#292524]/20 hover:bg-[#292524]/5 text-[#292524]"
													: "border-white/20 hover:bg-white/10 text-white"
											}`}
										>
											<Search size={16} />
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* PAGINATION */}
					{totalPages > 1 && (
						<div className="flex justify-center items-center gap-6 pb-20">
							<button
								onClick={() => onPageChange(Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								className={`p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getPaginationBtnStyle()}`}
							>
								<ChevronLeft size={24} />
							</button>

							<span
								className={`text-sm font-bold tracking-widest ${
									theme === ThemeType.SOFT
										? "text-[#292524]"
										: theme === ThemeType.MINIMAL
										? "text-black"
										: "text-white"
								}`}
							>
								СТРАНИЦА {currentPage} / {totalPages}
							</span>

							<button
								onClick={() =>
									onPageChange(Math.min(totalPages, currentPage + 1))
								}
								disabled={currentPage === totalPages}
								className={`p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getPaginationBtnStyle()}`}
							>
								<ChevronRight size={24} />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};
