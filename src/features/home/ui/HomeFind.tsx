import React from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
enum ThemeType {
	SOFT = "soft",
	MINIMAL = "minimal",
	AMOLED = "amoled",
	DEFAULT = "default",
}
const useTheme = () => ({
	theme: ThemeType.DEFAULT as ThemeType,
});
const If: React.FC<{ is: boolean; children: React.ReactNode }> = ({
	is,
	children,
}) => (is ? children : null);
interface IProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedCategory: any;
	onCategoryChange: (category: any) => void;
}

export const HomeFind: React.FC<IProps> = ({
	searchQuery,
	setSearchQuery,
	selectedCategory,
	onCategoryChange,
}) => {
	const { theme } = useTheme();

	const categories: any = ["Все", "Одежда", "Электроника", "Для дома"];
	const getButtonStyle = (): string => {
		if (theme === ThemeType.SOFT) {
			return "bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]";
		}
		if (theme === ThemeType.MINIMAL) {
			return "bg-black text-white hover:bg-gray-800";
		}
		return "bg-white text-black hover:bg-pink-500 hover:text-white";
	};
	const getSearchInputStyle = (): string => {
		if (theme === ThemeType.SOFT) {
			return "bg-[#F5EBE0]/50 border-[#292524]/20 text-[#292524] placeholder-[#292524]/40 focus:border-[#292524]";
		}
		if (theme === ThemeType.MINIMAL) {
			return "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-black";
		}
		if (theme === ThemeType.AMOLED) {
			return "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500";
		}
		return "bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-white/50 focus:bg-white/10";
	};
	const isSoft = theme === ThemeType.SOFT;
	return (
		<div
			className={`max-w-7xl mx-auto mb-10 w-full p-4 transition-colors ${
				isSoft ? "text-[#292524]" : "text-white"
			}`}
		>
			<motion.h2
				initial={{ opacity: 0, x: -20 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				className={`text-4xl md:text-6xl font-bold mb-8 ${
					isSoft ? "text-[#292524]" : "text-white"
				}`}
			>
				Новые поступления
			</motion.h2>

			<div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">
				<div className="relative w-full lg:w-96 group">
					<Search
						className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
							isSoft
								? "text-[#292524]/40 group-focus-within:text-[#292524]"
								: "text-white/40 group-focus-within:text-white"
						}`}
					/>
					<input
						type="text"
						placeholder="Поиск товаров..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={`w-full pl-12 pr-10 py-3 rounded-full outline-none border transition-all ${getSearchInputStyle()}`}
					/>
					<If is={!!searchQuery}>
						<button
							onClick={() => setSearchQuery("")}
							className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors ${
								isSoft
									? "text-[#292524]/60 hover:bg-[#292524]/10"
									: "text-white/60 hover:bg-white/10"
							}`}
						>
							<X size={14} />
						</button>
					</If>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					{categories.map((cat: any) => (
						<button
							key={cat}
							onClick={() => onCategoryChange(cat)}
							className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
								selectedCategory === cat
									? getButtonStyle()
									: isSoft
									? "bg-transparent border border-[#292524]/20 hover:border-[#292524] text-[#292524]"
									: "bg-transparent border border-white/20 hover:border-white text-white"
							}`}
						>
							{cat}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
