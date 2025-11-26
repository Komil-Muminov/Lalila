import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./shared/context/ThemeContext";
import { CartProvider } from "./shared/context/CartContext";
import AppLayout from "./layouts/AppLayout";
import { Home } from "./pages/Home";
import { ProductDetails } from "./pages/ProductDetails";
import { Admin } from "./pages/Admin";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<CartProvider>
				<Router>
					<AppLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/product/:id" element={<ProductDetails />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</AppLayout>
				</Router>
			</CartProvider>
		</ThemeProvider>
	);
};

export default App;
