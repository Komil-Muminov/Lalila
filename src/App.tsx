import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider, ThemeProvider } from "./shared";
import { Admin, Cart, Home, ProductDetails } from "./pages";
import { Auth } from "./features/auth/ui";
import AppLayout from "./widgets/layout/AppLayout";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<CartProvider>
				<Router>
					<AppLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/auth" element={<Auth />} />
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
