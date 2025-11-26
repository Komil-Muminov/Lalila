
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductStage } from '../components/3D/ProductStage';
import { fetchProducts } from '../services/api';
import { Product, ThemeType, ProductCategory } from '../types';
import { useCart } from '../shared/context/CartContext';
import { useTheme } from '../shared/context/ThemeContext';
import { ProductSkeleton } from '../components/UI/ProductSkeleton';
import { Plus, Search, ChevronLeft, ChevronRight, ArrowDown, X } from 'lucide-react';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Refs for scrolling
  const catalogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchLower) || 
                          p.description.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category: ProductCategory | 'All') => {
    setSelectedCategory(category);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCardStyle = () => {
    if (theme === ThemeType.MINIMAL) return 'bg-white border border-gray-100 shadow-xl shadow-gray-200/50 text-gray-900';
    if (theme === ThemeType.AMOLED) return 'bg-gray-900 border border-gray-800 text-white';
    if (theme === ThemeType.SOFT) return 'bg-[#F5EBE0]/70 backdrop-blur-2xl border border-white/60 shadow-xl shadow-[#4A403A]/10 text-[#292524] rounded-[2rem]';
    // Enhanced Glass Theme
    return 'bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl shadow-black/20 ring-1 ring-white/10';
  };

  const getButtonStyle = () => {
    if (theme === ThemeType.SOFT) return 'bg-[#292524] text-[#E3D5CA] hover:bg-[#433A36]';
    if (theme === ThemeType.MINIMAL) return 'bg-black text-white hover:bg-gray-800';
    return 'bg-white text-black hover:bg-pink-500 hover:text-white';
  };

  const getPaginationBtnStyle = () => {
    if (theme === ThemeType.SOFT) return 'hover:bg-[#292524]/10 text-[#292524] disabled:text-[#292524]/30';
    if (theme === ThemeType.MINIMAL) return 'hover:bg-gray-100 text-black disabled:text-gray-300';
    return 'hover:bg-white/10 text-white disabled:text-white/30';
  };

  const getSearchInputStyle = () => {
    if (theme === ThemeType.SOFT) return 'bg-[#F5EBE0]/50 border-[#292524]/20 text-[#292524] placeholder-[#292524]/40 focus:border-[#292524]';
    if (theme === ThemeType.MINIMAL) return 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-black';
    if (theme === ThemeType.AMOLED) return 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500';
    return 'bg-white/5 border-white/20 text-white placeholder-white/40 focus:border-white/50 focus:bg-white/10';
  };

  const categories: (ProductCategory | 'All')[] = ['All', 'Apparel', 'Electronics', 'Home'];

  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar">
      
      {/* SECTION 1: HERO (Full Screen Snap) */}
      <section className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 z-0">
             {theme === ThemeType.SOFT ? (
                <div className="w-full h-full bg-[#E3D5CA]">
                   <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A690]/30 rounded-full blur-3xl"></div>
                   <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#F5EBE0]/40 rounded-full blur-3xl"></div>
                </div>
             ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-black/80">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                </div>
             )}
         </div>

         {/* 3D Abstract Centerpiece */}
         <div className="absolute inset-0 z-0 opacity-60">
            <ProductStage shape="torus" color={theme === ThemeType.SOFT ? '#8d7f76' : '#a855f7'} interactive={false} />
         </div>

         {/* Typography */}
         <div className="relative z-10 text-center px-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-sm md:text-lg font-bold tracking-[0.5em] uppercase mb-4 ${theme === ThemeType.SOFT ? 'text-[#433A36]' : 'text-purple-200'}`}
            >
              Komil Muminov
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className={`text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 ${theme === ThemeType.SOFT ? 'text-[#292524]' : 'text-white'}`}
            >
              PHENOMEN
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={scrollToCatalog}
              className={`group flex flex-col items-center gap-2 mx-auto text-sm font-bold tracking-widest uppercase transition-colors ${theme === ThemeType.SOFT ? 'text-[#292524] hover:text-black' : 'text-white/60 hover:text-white'}`}
            >
              <span>Explore Collection</span>
              <ArrowDown className="animate-bounce mt-2" size={20} />
            </motion.button>
         </div>
      </section>

      {/* SECTION 2: CATALOG (Full Screen Snap Start) */}
      <section ref={catalogRef} className="min-h-screen w-full snap-start pt-24 px-4 md:px-8 pb-12 flex flex-col relative z-10 bg-inherit">
        <div className="max-w-7xl mx-auto mb-10 w-full">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-6xl font-display font-bold mb-8 ${theme === ThemeType.SOFT ? 'text-[#292524]' : 'text-white'}`}
          >
            Latest Drops
          </motion.h2>
          
          {/* Controls Container */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8">
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-96 group">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${theme === ThemeType.SOFT ? 'text-[#292524]/40 group-focus-within:text-[#292524]' : 'text-white/40 group-focus-within:text-white'}`} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-10 py-3 rounded-full outline-none border transition-all ${getSearchInputStyle()}`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors ${theme === ThemeType.SOFT ? 'text-[#292524]/60' : 'text-white/60'}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat 
                      ? getButtonStyle() 
                      : (theme === ThemeType.SOFT ? 'bg-transparent border border-[#292524]/20 hover:border-[#292524] text-[#292524]' : 'bg-transparent border border-white/20 hover:border-white text-white')
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto w-full flex-grow">
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
               {Array.from({ length: 8 }).map((_, i) => (
                 <ProductSkeleton key={i} />
               ))}
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {displayedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative overflow-hidden group flex flex-col h-[450px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${getCardStyle()}`}
                  >
                    {/* Image / 3D Area */}
                    <Link to={`/product/${product.id}`} className="block h-3/5 w-full relative cursor-pointer overflow-hidden">
                       <div className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${theme === ThemeType.SOFT ? 'bg-[#E3D5CA]/30' : 'bg-gradient-to-b from-transparent to-black/20'}`}>
                          <ProductStage shape={product.shape} color={theme === ThemeType.SOFT && product.category === 'Apparel' ? '#8d7f76' : product.color} interactive={false} />
                       </div>
                       
                       {!product.inStock && (
                         <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                           SOLD OUT
                         </div>
                       )}
                    </Link>

                    {/* Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between relative z-10">
                      <Link to={`/product/${product.id}`}>
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex-1 pr-2">
                             <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${theme === ThemeType.SOFT ? 'text-[#292524]/60' : 'text-white/60'}`}>{product.category}</p>
                             <h3 className="text-xl font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                           </div>
                           <span className="text-lg font-bold font-mono">${product.price}</span>
                        </div>
                      </Link>
                      
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if(product.inStock) addToCart(product, product.sizes?.[0]);
                          }}
                          disabled={!product.inStock}
                          className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition-all shadow-md active:shadow-none active:translate-y-px ${
                             !product.inStock ? 'opacity-50 cursor-not-allowed bg-gray-500 text-white' : getButtonStyle()
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <Plus size={16} /> Quick Add
                            </>
                          ) : 'Out of Stock'}
                        </button>
                        <Link 
                          to={`/product/${product.id}`}
                          className={`p-3 rounded-xl flex items-center justify-center border transition-colors ${
                            theme === ThemeType.SOFT 
                              ? 'border-[#292524]/20 hover:bg-[#292524]/5 text-[#292524]' 
                              : 'border-white/20 hover:bg-white/10 text-white'
                          }`}
                        >
                          <Search size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-6 pb-20">
                   <button
                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                     disabled={currentPage === 1}
                     className={`p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getPaginationBtnStyle()}`}
                   >
                     <ChevronLeft size={24} />
                   </button>
                   
                   <span className={`text-sm font-bold tracking-widest ${theme === ThemeType.SOFT ? 'text-[#292524]' : (theme === ThemeType.MINIMAL ? 'text-black' : 'text-white')}`}>
                      PAGE {currentPage} / {totalPages}
                   </span>

                   <button
                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                     disabled={currentPage === totalPages}
                     className={`p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getPaginationBtnStyle()}`}
                   >
                     <ChevronRight size={24} />
                   </button>
                </div>
              )}
              
              {displayedProducts.length === 0 && (
                <div className="text-center py-20 opacity-50 flex flex-col items-center">
                   <Search size={48} className="mb-4 opacity-50" />
                   <p className="text-xl font-bold">No products found</p>
                   <p className="text-sm opacity-60 mt-2">Try adjusting your search or filters</p>
                   {(searchQuery || selectedCategory !== 'All') && (
                     <button 
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="mt-6 text-sm underline opacity-80 hover:opacity-100"
                     >
                       Clear all filters
                     </button>
                   )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
