import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CartProvider } from "@/shared/ui/context";
import { AppLayout } from "@/widgets";
import { Home, ProductDetails, Admin, Cart } from "@/pages";
import { Auth } from "./features/auth/ui";

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
