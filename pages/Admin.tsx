
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { Product, ThemeType, ProductCategory } from '../types';
import { useTheme } from '../shared/context/ThemeContext';
import { Trash2, Edit2, Plus, X, Check, Package, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export const Admin: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8; // Adjusted for table view
  
  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    description: '',
    category: 'Apparel',
    shape: 'box',
    color: '#ffffff',
    inStock: true
  });

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  // Auto-adjust page
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [products.length, totalPages, currentPage]);

  const handleSave = async () => {
    if (isEditing && isEditing.id) {
      await updateProduct(isEditing.id, formData);
    } else {
      await createProduct(formData as Omit<Product, 'id'>);
    }
    setIsEditing(null);
    setIsCreating(false);
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const openEdit = (product: Product) => {
    setIsEditing(product);
    setFormData(product);
    setIsCreating(false);
  };

  const openCreate = () => {
    setIsEditing(null);
    setIsCreating(true);
    setFormData({
      name: '',
      price: 0,
      description: '',
      category: 'Apparel',
      shape: 'box',
      color: '#ffffff',
      inStock: true,
      sizes: ['S', 'M', 'L']
    });
  };

  const getContainerClass = () => {
     if (theme === ThemeType.SOFT) return 'bg-[#F5EBE0]/90 border border-[#D4C3B5] shadow-lg text-[#292524]';
     if (theme === ThemeType.MINIMAL) return 'bg-white border border-gray-200 shadow-lg text-gray-900';
     return 'bg-black/30 backdrop-blur-xl border border-white/10 text-white shadow-2xl';
  };

  const getTableHeadClass = () => {
    if (theme === ThemeType.SOFT) return 'bg-[#E3D5CA] text-[#292524]';
    if (theme === ThemeType.MINIMAL) return 'bg-gray-100 text-gray-600';
    return 'bg-white/5 text-gray-300';
  };

  const getTableRowClass = () => {
    if (theme === ThemeType.SOFT) return 'border-b border-[#D4C3B5] hover:bg-[#E3D5CA]/40';
    if (theme === ThemeType.MINIMAL) return 'border-b border-gray-100 hover:bg-gray-50';
    return 'border-b border-white/5 hover:bg-white/5';
  };

  const getInputStyle = () => {
    if (theme === ThemeType.SOFT) return 'bg-[#F5EBE0] border border-[#D4C3B5] text-[#292524] placeholder-[#292524]/40';
    if (theme === ThemeType.MINIMAL) return 'bg-gray-50 border border-gray-200 text-black';
    return 'bg-white/10 border border-white/20 text-white placeholder-white/40';
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 pb-12 w-full">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className={`text-4xl font-display font-bold ${theme === ThemeType.SOFT ? 'text-[#292524]' : ''}`}>Inventory</h1>
            <p className="opacity-60 mt-1">Manage catalog (Total: {products.length})</p>
          </div>
          <button 
            onClick={openCreate}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg ${theme === ThemeType.SOFT ? 'bg-[#292524] text-[#E3D5CA]' : 'bg-pink-600 text-white'}`}
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

        {/* Modal Form */}
        {(isEditing || isCreating) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-full max-w-2xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl ${theme === ThemeType.SOFT ? 'bg-[#E3D5CA] text-[#292524]' : 'bg-[#1a1a1a] text-white border border-white/10'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{isCreating ? 'Create Product' : 'Edit Product'}</h2>
                <button onClick={() => { setIsEditing(null); setIsCreating(false); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Product Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 transition-all ${getInputStyle()}`}
                    placeholder="e.g. Neo-Tokyo Jacket"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Price ($)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className={`w-full p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 transition-all ${getInputStyle()}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})}
                    className={`w-full p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 appearance-none transition-all ${getInputStyle()}`}
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home">Home</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className={`w-full p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 transition-all ${getInputStyle()}`}
                  />
                </div>
                
                <div>
                   <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">3D Shape</label>
                   <select 
                    value={formData.shape}
                    onChange={e => setFormData({...formData, shape: e.target.value as 'box'|'sphere'|'torus'})}
                    className={`w-full p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 appearance-none transition-all ${getInputStyle()}`}
                  >
                    <option value="box">Box (Structure)</option>
                    <option value="sphere">Sphere (Organic)</option>
                    <option value="torus">Torus (Ring/Loop)</option>
                  </select>
                </div>

                 <div>
                   <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">Color Hex</label>
                   <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={formData.color}
                        onChange={e => setFormData({...formData, color: e.target.value})}
                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-none p-0"
                      />
                      <input 
                        type="text"
                        value={formData.color}
                        onChange={e => setFormData({...formData, color: e.target.value})}
                        className={`flex-1 p-3 rounded-lg outline-none focus:ring-2 ring-pink-500/50 uppercase ${getInputStyle()}`} 
                      />
                   </div>
                </div>

                <div className="col-span-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={formData.inStock}
                      onChange={e => setFormData({...formData, inStock: e.target.checked})}
                      className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="font-bold">Available In Stock</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/10">
                <button 
                  onClick={() => { setIsEditing(null); setIsCreating(false); }}
                  className="px-6 py-3 rounded-lg font-bold opacity-60 hover:opacity-100 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 ${theme === ThemeType.SOFT ? 'bg-[#292524] text-[#E3D5CA]' : 'bg-pink-600 text-white'}`}
                >
                  <Check size={18} /> {isCreating ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* DATA TABLE */}
        <div className={`w-full overflow-hidden rounded-2xl ${getContainerClass()}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`text-xs uppercase tracking-wider ${getTableHeadClass()}`}>
                  <th className="p-4 pl-6 font-bold">Product</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {displayedProducts.map((product) => (
                  <tr key={product.id} className={`transition-colors ${getTableRowClass()}`}>
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-md flex items-center justify-center shadow-inner"
                          style={{ backgroundColor: product.color }}
                        >
                          <Package size={16} className="text-white/50 mix-blend-overlay" />
                        </div>
                        <div>
                           <div className="font-bold">{product.name}</div>
                           <div className="text-xs opacity-50 truncate max-w-[150px]">{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 opacity-80 text-sm font-medium">{product.category}</td>
                    <td className="p-4 font-mono font-medium">${product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        product.inStock 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEdit(product)}
                          className={`p-2 rounded-lg transition-colors ${theme === ThemeType.SOFT ? 'hover:bg-[#292524]/10 text-[#292524]' : 'hover:bg-white/20 text-white'}`}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {displayedProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center opacity-50">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className={`p-4 border-t flex justify-between items-center ${theme === ThemeType.SOFT ? 'border-[#D4C3B5]' : (theme === ThemeType.MINIMAL ? 'border-gray-200' : 'border-white/10')}`}>
             <div className="text-xs font-bold opacity-50 ml-2">
                Page {currentPage} of {totalPages}
             </div>
             <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === 1 
                      ? 'opacity-30 cursor-not-allowed' 
                      : (theme === ThemeType.SOFT ? 'hover:bg-[#292524]/10' : 'hover:bg-white/10')
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'opacity-30 cursor-not-allowed' 
                      : (theme === ThemeType.SOFT ? 'hover:bg-[#292524]/10' : 'hover:bg-white/10')
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
