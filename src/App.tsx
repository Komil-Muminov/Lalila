import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './shared/context/ThemeContext';
import { CartProvider } from './shared/context/CartContext';
import { AppLayout } from './components/Layout/AppLayout';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Admin } from './pages/Admin';

// Initialize the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching when clicking between windows for better UX in this demo
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;