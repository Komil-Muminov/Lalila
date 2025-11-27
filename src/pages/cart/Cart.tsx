import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/shared/ui/context";
import { useTheme } from "@/shared/ui/context";
import { ThemeType } from "@/entities/theme";
import {
	ArrowLeft,
	Trash2,
	ShoppingBag,
	CheckCircle,
	Plus,
	Minus,
} from "lucide-react";

export const Cart: React.FC = () => {
	const navigate = useNavigate();
	const { cart, removeFromCart, total, increaseQuantity, decreaseQuantity } =
		useCart();
	const { theme } = useTheme();
	const [isCheckout, setIsCheckout] = useState(false);
	const [orderComplete, setOrderComplete] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		zipCode: "",
	});

	const getContainerStyle = () => {
		if (theme === ThemeType.SOFT) return "bg-[#E3D5CA]/50 text-[#292524]";
		if (theme === ThemeType.MINIMAL) return "bg-white text-gray-900";
		if (theme === ThemeType.AMOLED) return "bg-gray-900 text-white";
		return "bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white";
	};

	const getInputStyle = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/70 border-[#292524]/20 text-[#292524] placeholder-[#292524]/40";
		if (theme === ThemeType.MINIMAL)
			return "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";
		if (theme === ThemeType.AMOLED)
			return "bg-gray-800 border-gray-700 text-white placeholder-gray-500";
		return "bg-white/5 border-white/20 text-white placeholder-white/40";
	};

	const getButtonStyle = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]";
		if (theme === ThemeType.MINIMAL)
			return "bg-black text-white hover:bg-gray-800";
		return "bg-pink-600 text-white hover:bg-pink-700";
	};

	const getCardStyle = () => {
		if (theme === ThemeType.SOFT)
			return "bg-[#F5EBE0]/40 border-[#D4C3B5]/50 text-[#292524]";
		if (theme === ThemeType.MINIMAL)
			return "bg-gray-50 border-gray-200 text-gray-900";
		if (theme === ThemeType.AMOLED)
			return "bg-gray-800 border-gray-700 text-white";
		return "bg-white/5 border-white/10 text-white";
	};

	const handleSubmitOrder = (e: React.FormEvent) => {
		e.preventDefault();
		setOrderComplete(true);
		setTimeout(() => {
			navigate("/");
		}, 3000);
	};

	if (orderComplete) {
		return (
			<div
				className={`min-h-screen pt-24 px-4 md:px-8 pb-12 w-full flex items-center justify-center ${getContainerStyle()}`}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className={`max-w-md w-full p-12 rounded-3xl text-center border ${getCardStyle()}`}
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2 }}
						className="mb-6 flex justify-center"
					>
						<CheckCircle size={64} className="text-green-500" />
					</motion.div>
					<h2 className="text-3xl font-bold mb-3">Спасибо!</h2>
					<p className="opacity-70 mb-2">Ваш заказ принят</p>
					<p className="text-sm opacity-60">Перенаправление на главную...</p>
				</motion.div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen pt-24 px-4 md:px-8 pb-12 w-full ${getContainerStyle()}`}
		>
			<div className="max-w-7xl mx-auto">
				<button
					onClick={() => navigate("/")}
					className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg font-bold transition-all ${
						theme === ThemeType.SOFT
							? "bg-[#292524]/10 text-[#292524] hover:bg-[#292524]/20"
							: "bg-white/10 text-white hover:bg-white/20"
					}`}
				>
					<ArrowLeft size={18} /> Назад в магазин
				</button>

				{cart.length === 0 ? (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`max-w-2xl mx-auto p-12 rounded-3xl border text-center ${getCardStyle()}`}
					>
						<ShoppingBag size={64} className="mx-auto mb-6 opacity-50" />
						<h2 className="text-3xl font-bold mb-3">Корзина пуста</h2>
						<p className="opacity-70 mb-8">Начните покупки прямо сейчас</p>
						<button
							onClick={() => navigate("/")}
							className={`px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 ${getButtonStyle()}`}
						>
							Продолжить покупки
						</button>
					</motion.div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2">
							<h1 className="text-4xl font-bold mb-8">Корзина</h1>
							<div className="space-y-4">
								{cart.map((item, index) => (
									<motion.div
										key={`${item.id}-${index}`}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										className={`p-6 rounded-2xl border flex items-center justify-between ${getCardStyle()}`}
									>
										<div className="flex-1">
											<div className="flex items-start justify-between mb-2">
												<div>
													<p className="text-xs font-bold uppercase opacity-60 mb-1">
														{item.category}
													</p>
													<h3 className="font-bold text-lg">{item.name}</h3>
												</div>
												<span className="text-lg font-mono font-bold">
													${item.price.toFixed(2)}
												</span>
											</div>
											{item.selectedSize && (
												<p className="text-sm opacity-70">
													Размер:{" "}
													<span className="font-bold">{item.selectedSize}</span>
												</p>
											)}
											<div className="mt-3 flex items-center gap-3">
												<button
													onClick={() =>
														decreaseQuantity(item.id, item.selectedSize)
													}
													className={`p-2 rounded-lg transition-colors ${
														theme === ThemeType.SOFT
															? "bg-[#292524]/10 hover:bg-[#292524]/20 text-[#292524]"
															: "bg-white/10 hover:bg-white/20 text-white"
													}`}
												>
													<Minus size={16} />
												</button>
												<span className="text-sm font-bold min-w-[2rem] text-center">
													{item.quantity}
												</span>
												<button
													onClick={() =>
														increaseQuantity(item.id, item.selectedSize)
													}
													className={`p-2 rounded-lg transition-colors ${
														theme === ThemeType.SOFT
															? "bg-[#292524]/10 hover:bg-[#292524]/20 text-[#292524]"
															: "bg-white/10 hover:bg-white/20 text-white"
													}`}
												>
													<Plus size={16} />
												</button>
											</div>
										</div>
										<button
											onClick={() => removeFromCart(item.id)}
											className={`ml-6 p-3 rounded-lg transition-colors ${
												theme === ThemeType.SOFT
													? "text-red-600 hover:bg-red-100"
													: "text-red-500 hover:bg-red-500/10"
											}`}
										>
											<Trash2 size={20} />
										</button>
									</motion.div>
								))}
							</div>
						</div>

						{/* Summary & Checkout */}
						<div>
							<div
								className={`sticky top-24 p-8 rounded-2xl border ${getCardStyle()}`}
							>
								<h2 className="text-2xl font-bold mb-6">Итого</h2>

								<div className="space-y-3 mb-6 pb-6 border-b border-current opacity-60">
									<div className="flex justify-between">
										<span>Товары ({cart.length}):</span>
										<span className="font-bold">
											$
											{cart
												.reduce(
													(acc, item) => acc + item.price * item.quantity,
													0,
												)
												.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Доставка:</span>
										<span className="font-bold">Бесплатно</span>
									</div>
								</div>

								<div className="flex justify-between mb-8 text-xl font-bold">
									<span>Всего:</span>
									<span className="text-2xl">${total.toFixed(2)}</span>
								</div>

								<button
									onClick={() => setIsCheckout(!isCheckout)}
									className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-3 ${getButtonStyle()}`}
								>
									{isCheckout ? "Отмена" : "Оформить заказ"}
								</button>
								<button
									onClick={() => navigate("/")}
									className={`w-full py-3 rounded-xl font-bold transition-all ${
										theme === ThemeType.SOFT
											? "bg-[#292524]/10 text-[#292524] hover:bg-[#292524]/20"
											: "bg-white/10 text-white hover:bg-white/20"
									}`}
								>
									Продолжить покупки
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Checkout Form */}
				{isCheckout && cart.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`mt-8 p-8 rounded-2xl border ${getCardStyle()}`}
					>
						<h2 className="text-2xl font-bold mb-8">Данные для доставки</h2>

						<form onSubmit={handleSubmitOrder}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Имя
									</label>
									<input
										type="text"
										required
										value={formData.firstName}
										onChange={(e) =>
											setFormData({ ...formData, firstName: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="Ваше имя"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Фамилия
									</label>
									<input
										type="text"
										required
										value={formData.lastName}
										onChange={(e) =>
											setFormData({ ...formData, lastName: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="Ваша фамилия"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Email
									</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="your@email.com"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Телефон
									</label>
									<input
										type="tel"
										required
										value={formData.phone}
										onChange={(e) =>
											setFormData({ ...formData, phone: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="+7 (999) 999-99-99"
									/>
								</div>
								<div className="md:col-span-2">
									<label className="block text-sm font-bold mb-2 opacity-70">
										Адрес доставки
									</label>
									<input
										type="text"
										required
										value={formData.address}
										onChange={(e) =>
											setFormData({ ...formData, address: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="Улица, дом, квартира"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Город
									</label>
									<input
										type="text"
										required
										value={formData.city}
										onChange={(e) =>
											setFormData({ ...formData, city: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="Город"
									/>
								</div>
								<div>
									<label className="block text-sm font-bold mb-2 opacity-70">
										Почтовый индекс
									</label>
									<input
										type="text"
										required
										value={formData.zipCode}
										onChange={(e) =>
											setFormData({ ...formData, zipCode: e.target.value })
										}
										className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${getInputStyle()}`}
										placeholder="123456"
									/>
								</div>
							</div>

							<div className="flex gap-4">
								<button
									type="button"
									onClick={() => setIsCheckout(false)}
									className={`flex-1 py-4 rounded-xl font-bold transition-all ${
										theme === ThemeType.SOFT
											? "bg-[#292524]/10 text-[#292524] hover:bg-[#292524]/20"
											: "bg-white/10 text-white hover:bg-white/20"
									}`}
								>
									Вернуться в корзину
								</button>
								<button
									type="submit"
									className={`flex-1 py-4 rounded-xl font-bold transition-all ${getButtonStyle()}`}
								>
									Оплатить ${total.toFixed(2)}
								</button>
							</div>
						</form>
					</motion.div>
				)}
			</div>
		</div>
	);
};
