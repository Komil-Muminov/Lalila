import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductStage } from "@/shared/ui/components/3D/ProductStage";
import { useProduct } from "@/shared/api";
import { ThemeType } from "@/entities/theme";
import { useCart } from "@/shared/ui/context";
import { useTheme } from "@/shared/ui/context";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";

export const ProductDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addToCart } = useCart();
	const { theme } = useTheme();

	const { data: product, isLoading: loading } = useProduct(id || "");
	const [selectedSize, setSelectedSize] = useState<string>("");

	useEffect(() => {
		if (product && product.sizes && product.sizes.length > 0 && !selectedSize) {
			setSelectedSize(product.sizes[0]);
		}
	}, [product, selectedSize]);

	const getButtonStyle = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]";
		if (theme === ThemeType.MINIMAL)
			return "bg-black text-white hover:bg-gray-800";
		return "bg-white text-black hover:bg-pink-500 hover:text-white";
	};

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	if (!product)
		return (
			<div className="h-screen flex items-center justify-center">
				Product not found
			</div>
		);

	return (
		<div className="min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden">
			<div className="w-full lg:w-3/5 h-[50vh] lg:h-auto relative bg-gradient-to-b from-transparent to-black/5">
				<button
					onClick={() => navigate("/")}
					className={`absolute top-6 left-6 z-20 p-2 rounded-full backdrop-blur-md flex items-center gap-2 text-sm font-bold hover:px-4 transition-all ${
						theme === ThemeType.SOFT
							? "bg-[#E3D5CA]/80 text-[#292524]"
							: "bg-white/10 text-white"
					}`}
				>
					<ArrowLeft size={16} /> Назад
				</button>
				<ProductStage
					shape={product.shape}
					color={
						theme === ThemeType.SOFT && product.category === "Одежда"
							? "#8d7f76"
							: product.color
					}
					interactive={true}
				/>
			</div>

			<motion.div
				initial={{ x: 100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				className={`w-full lg:w-2/5 h-full overflow-y-auto p-8 lg:p-16 flex flex-col justify-center ${
					theme === ThemeType.SOFT
						? "bg-[#E3D5CA]/50 backdrop-blur-xl"
						: "backdrop-blur-md bg-black/20"
				}`}
			>
				<div className="mb-2">
					<span className="text-sm font-bold tracking-widest uppercase opacity-60">
						{product.category}
					</span>
				</div>
				<h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
					{product.name}
				</h1>
				<p className="text-2xl font-light mb-8">${product.price.toFixed(2)}</p>

				<div className="mb-8 opacity-80 leading-relaxed">
					{product.description}
				</div>

				{product.sizes && (
					<div className="mb-8">
						<label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-70">
							Выберите размер
						</label>
						<div className="flex flex-wrap gap-3">
							{product.sizes.map((size) => (
								<button
									key={size}
									onClick={() => setSelectedSize(size)}
									className={`min-w-[3rem] h-12 px-4 rounded-lg font-bold border flex items-center justify-center transition-all ${
										selectedSize === size
											? theme === ThemeType.SOFT
												? "bg-[#292524] text-[#E3D5CA] border-[#292524]"
												: "bg-white text-black border-white"
											: theme === ThemeType.SOFT
											? "border-[#292524]/30 text-[#292524] hover:border-[#292524]"
											: "border-white/30 text-white hover:border-white"
									}`}
								>
									{size}
								</button>
							))}
						</div>
					</div>
				)}

				<div className="flex gap-4 mt-auto pt-8 border-t border-current border-opacity-10">
					<button
						onClick={() => addToCart(product, selectedSize)}
						disabled={!product.inStock}
						className={`flex-1 py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 ${getButtonStyle()}`}
					>
						{product.inStock ? (
							<>
								<ShoppingBag size={20} /> Добавить в корзину
							</>
						) : (
							"Out of Stock"
						)}
					</button>
				</div>

				<div className="mt-12 grid grid-cols-2 gap-4 text-xs opacity-60">
					<div className="flex items-center gap-2">
						<Check size={14} /> Бесплатная доставка
					</div>
					<div className="flex items-center gap-2">
						<Check size={14} /> Гарантия 5 лет
					</div>
					<div className="flex items-center gap-2">
						<Check size={14} /> Безопасные платежи
					</div>
					<div className="flex items-center gap-2">
						<Check size={14} /> Поддержка 24/7
					</div>
				</div>
			</motion.div>
		</div>
	);
};
