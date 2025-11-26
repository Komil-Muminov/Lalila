import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../shared/context/ThemeContext";
import { useCart } from "../../shared/context/CartContext";
import { ThemeType } from "../../types";
import {
	ShoppingBag,
	Box,
	Sun,
	Moon,
	Droplets,
	Coffee,
	Settings,
} from "lucide-react";

export const Navbar: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const { cart } = useCart();
	const location = useLocation();

	const getGlassClasses = () => {
		if (theme === ThemeType.MINIMAL)
			return "bg-white/90 backdrop-blur-md border-b border-gray-200 text-gray-900";
		if (theme === ThemeType.AMOLED)
			return "bg-black/80 backdrop-blur-md border-b border-gray-800 text-white";
		if (theme === ThemeType.SOFT)
			return "bg-[#E3D5CA]/80 backdrop-blur-lg border-b border-[#D4C3B5]/50 text-[#433A36]";
		return "bg-white/5 backdrop-blur-lg border-b border-white/10 text-white shadow-2xl shadow-black/5";
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 h-20 px-6 flex items-center justify-between transition-all duration-500 ${getGlassClasses()}`}
		>
			<Link to="/" className="flex items-center gap-2 group">
				<div
					className={`w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 ${
						theme === ThemeType.SOFT
							? "bg-[#292524] text-[#E3D5CA]"
							: "bg-gradient-to-tr from-purple-500 to-pink-500 text-white"
					}`}
				>
					<Box className="w-6 h-6" />
				</div>
				<span className="text-2xl font-display font-bold tracking-tight">
					Lalila
				</span>
			</Link>

			<div className="flex items-center gap-6">
				<div className="hidden md:flex items-center gap-6 mr-4 font-medium opacity-80">
					<Link
						to="/"
						className={`hover:opacity-100 transition-opacity ${
							location.pathname === "/" ? "opacity-100 font-bold" : ""
						}`}
					>
						Магазин
					</Link>
					<Link
						to="/admin"
						className={`flex items-center gap-1 hover:opacity-100 transition-opacity ${
							location.pathname === "/admin" ? "opacity-100 font-bold" : ""
						}`}
					>
						<Settings size={14} /> Администратор
					</Link>
				</div>

				<div
					className={`flex items-center p-1 rounded-full ${
						theme === ThemeType.MINIMAL || theme === ThemeType.SOFT
							? "bg-black/5"
							: "bg-white/10"
					}`}
				>
					<button
						onClick={() => setTheme(ThemeType.MINIMAL)}
						className={`p-2 rounded-full transition-all ${
							theme === ThemeType.MINIMAL
								? "bg-white shadow-sm text-black"
								: "text-gray-400 hover:text-current"
						}`}
					>
						<Sun size={18} />
					</button>
					<button
						onClick={() => setTheme(ThemeType.GLASS)}
						className={`p-2 rounded-full transition-all ${
							theme === ThemeType.GLASS
								? "bg-white/20 text-white"
								: "text-gray-400 hover:text-current"
						}`}
					>
						<Droplets size={18} />
					</button>
					<button
						onClick={() => setTheme(ThemeType.AMOLED)}
						className={`p-2 rounded-full transition-all ${
							theme === ThemeType.AMOLED
								? "bg-gray-800 text-purple-400"
								: "text-gray-400 hover:text-current"
						}`}
					>
						<Moon size={18} />
					</button>
					<button
						onClick={() => setTheme(ThemeType.SOFT)}
						className={`p-2 rounded-full transition-all ${
							theme === ThemeType.SOFT
								? "bg-[#C9A690] text-[#292524]"
								: "text-gray-400 hover:text-current"
						}`}
					>
						<Coffee size={18} />
					</button>
				</div>

				<button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
					<ShoppingBag className="w-6 h-6" />
					{cart.length > 0 && (
						<span
							className={`absolute top-0 right-0 w-5 h-5 text-xs font-bold rounded-full flex items-center justify-center animate-bounce ${
								theme === ThemeType.SOFT
									? "bg-[#292524] text-[#E3D5CA]"
									: "bg-pink-500 text-white"
							}`}
						>
							{cart.reduce((acc, item) => acc + item.quantity, 0)}
						</span>
					)}
				</button>
			</div>
		</nav>
	);
};
