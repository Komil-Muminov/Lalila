import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./shared/context/ThemeContext";
import { CartProvider } from "./shared/context/CartContext";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Admin } from "./pages/Admin";
import { AppLayout } from "./server/components/Layout/AppLayout";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<CartProvider>
				<HashRouter>
					<AppLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/product/:id" element={<ProductDetails />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</AppLayout>
				</HashRouter>
			</CartProvider>
		</ThemeProvider>
	);
};

export default App;
