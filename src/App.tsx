import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, ThemeProvider } from "./shared";
import { Admin, Cart, ProductDetails } from "./pages";
import AppLayout from "./widgets/layout/AppLayout";
import { AuthPage } from "./pages/auth/AuthPage";
import { HomePage } from "./pages/home/Home";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<CartProvider>
				<Router>
					<AppLayout>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/auth" element={<AuthPage />} />
							<Route path="/product/:id" element={<ProductDetails />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</AppLayout>
				</Router>
			</CartProvider>
		</ThemeProvider>
	);
};
export default App;
