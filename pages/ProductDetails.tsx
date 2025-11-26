
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductStage } from '../components/3D/ProductStage';
import { fetchProductById } from '../services/api';
import { Product, ThemeType } from '../types';
import { useCart } from '../shared/context/CartContext';
import { useTheme } from '../shared/context/ThemeContext';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      if (data && data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const getButtonStyle = () => {
    if (theme === ThemeType.SOFT) return 'bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]';
    if (theme === ThemeType.MINIMAL) return 'bg-black text-white hover:bg-gray-800';
    return 'bg-white text-black hover:bg-pink-500 hover:text-white';
  };

  const getSecondaryBtnStyle = () => {
     if (theme === ThemeType.SOFT) return 'border-[#292524] text-[#292524] hover:bg-[#292524]/10';
     if (theme === ThemeType.MINIMAL) return 'border-black text-black hover:bg-black/5';
     return 'border-white text-white hover:bg-white/10';
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden">
      {/* 3D Showcase Side */}
      <div className="w-full lg:w-3/5 h-[50vh] lg:h-auto relative bg-gradient-to-b from-transparent to-black/5">
        <button 
          onClick={() => navigate('/')}
          className={`absolute top-6 left-6 z-20 p-2 rounded-full backdrop-blur-md flex items-center gap-2 text-sm font-bold hover:px-4 transition-all ${
            theme === ThemeType.SOFT ? 'bg-[#E3D5CA]/80 text-[#292524]' : 'bg-white/10 text-white'
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <ProductStage shape={product.shape} color={theme === ThemeType.SOFT && product.category === 'Apparel' ? '#8d7f76' : product.color} interactive={true} />
      </div>

      {/* Details Side */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`w-full lg:w-2/5 h-full overflow-y-auto p-8 lg:p-16 flex flex-col justify-center ${
           theme === ThemeType.SOFT ? 'bg-[#E3D5CA]/50 backdrop-blur-xl' : 'backdrop-blur-md bg-black/20'
        }`}
      >
        <div className="mb-2">
           <span className="text-sm font-bold tracking-widest uppercase opacity-60">{product.category}</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">{product.name}</h1>
        <p className="text-2xl font-light mb-8">${product.price.toFixed(2)}</p>

        <div className="mb-8 opacity-80 leading-relaxed">
          {product.description}
        </div>

        {/* Sizes */}
        {product.sizes && (
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-70">Select Size</label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-12 px-4 rounded-lg font-bold border flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? (theme === ThemeType.SOFT ? 'bg-[#292524] text-[#E3D5CA] border-[#292524]' : 'bg-white text-black border-white')
                      : (theme === ThemeType.SOFT ? 'border-[#292524]/30 text-[#292524] hover:border-[#292524]' : 'border-white/30 text-white hover:border-white')
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-auto pt-8 border-t border-current border-opacity-10">
          <button 
            onClick={() => addToCart(product, selectedSize)}
            disabled={!product.inStock}
            className={`flex-1 py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 ${getButtonStyle()}`}
          >
            {product.inStock ? (
              <>
                <ShoppingBag size={20} /> Add to Bag
              </>
            ) : 'Out of Stock'}
          </button>
        </div>

        {/* Trust badges mockup */}
        <div className="mt-12 grid grid-cols-2 gap-4 text-xs opacity-60">
           <div className="flex items-center gap-2"><Check size={14} /> Free Global Shipping</div>
           <div className="flex items-center gap-2"><Check size={14} /> 5-Year Warranty</div>
           <div className="flex items-center gap-2"><Check size={14} /> Secure Payment</div>
           <div className="flex items-center gap-2"><Check size={14} /> 24/7 Support</div>
        </div>

      </motion.div>
    </div>
  );
};
