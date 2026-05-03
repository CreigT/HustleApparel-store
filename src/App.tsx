/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, Zap, Ruler, Globe, Instagram, Twitter, Menu, X, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, Product } from './data/products';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AISuggestions from './components/AISuggestions';

export default function App() {
  const [cartItems, setCartItems] = useState<(Product & { quantity: number })[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Tees' | 'Hoodies' | 'Long Sleeves'>('All');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: string, q: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item));
  };

  const handleCheckout = () => {
    // Lead user to the Spring Store for final purchase
    window.open('https://my-store-1100822-2.creator-spring.com/', '_blank');
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-orange-500 p-1.5 rounded-sm transform -rotate-12 group-hover:rotate-0 transition-transform">
            <Zap className="text-black" size={20} />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent uppercase tracking-tighter">HU$TLE APPAREL</span>
        </div>
        
        <div className="hidden md:flex gap-8 uppercase text-[10px] font-black tracking-widest text-zinc-400">
          <button onClick={() => setActiveCategory('All')} className={`hover:text-orange-500 transition-colors ${activeCategory === 'All' ? 'text-white' : ''}`}>Shop All</button>
          <button onClick={() => setActiveCategory('Tees')} className={`hover:text-orange-500 transition-colors ${activeCategory === 'Tees' ? 'text-white' : ''}`}>Tees</button>
          <button onClick={() => setActiveCategory('Hoodies')} className={`hover:text-orange-500 transition-colors ${activeCategory === 'Hoodies' ? 'text-white' : ''}`}>Hoodies</button>
          <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-orange-500 transition-colors">Size Guide</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            id="open-cart-btn"
          >
            <ShoppingBag size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        
        {/* Hero Section */}
        <section className="mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop&grayscale=true" 
              alt="Hero Streetwear"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[20s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-20">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Star className="text-orange-500 fill-orange-500" size={16} />
                  <span className="text-[10px] uppercase font-black tracking-[0.3em] text-white/50">Summer 26 Drop</span>
                </div>
                <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] uppercase tracking-tighter mb-8">
                  NO SLEEP <br />
                  <span className="text-orange-500 italic">ON THE GRIND</span>
                </h1>
                <div className="flex flex-col md:flex-row gap-6">
                  <button onClick={() => document.getElementById('essential-gear')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black px-10 py-5 font-black uppercase text-sm flex items-center gap-3 hover:bg-orange-500 transition-colors shadow-2xl shadow-white/10">
                    Explore Drop <Zap size={18} />
                  </button>
                  <a 
                    href="https://my-store-1100822-2.creator-spring.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="border border-white/20 hover:border-white/50 px-10 py-5 font-black uppercase text-sm flex items-center gap-3 transition-colors backdrop-blur-sm"
                  >
                    Legacy Store <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* Marquee */}
          <div className="absolute -bottom-10 left-0 w-full overflow-hidden whitespace-nowrap py-1 bg-orange-500 text-black -rotate-1 z-10 select-none">
            <div className="flex animate-marquee">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <span key={i} className="text-4xl font-black uppercase tracking-tighter px-10">Limited Edition Crypto Wear // Hustle Hard // Cali Vibes // Web3 Ready // Premium Fabric // </span>
              ))}
            </div>
          </div>
        </section>

        {/* AI Designer Lab */}
        <AISuggestions />

        {/* Filter Bar */}
        <div id="essential-gear" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 sticky top-[80px] bg-black/90 py-4 z-40 backdrop-blur-sm border-b border-white/5">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Essential Gear</h2>
            <p className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest mt-2">Showing result for {activeCategory}</p>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
            {['All', 'Tees', 'Hoodies', 'Long Sleeves'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-4 py-2 rounded text-[10px] uppercase font-black tracking-widest transition-all ${activeCategory === cat ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/20' : 'text-zinc-500 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-40">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="text-orange-500 fill-orange-500" size={32} />
              <span className="text-3xl font-black uppercase tracking-tighter leading-none">Hustle <br />Apparel</span>
            </div>
            <p className="text-zinc-600 text-sm max-w-xs mb-10 leading-relaxed font-medium">
              Forged in the shadows of the hustle. We build garments for the modern architect of digital and physical empires.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-orange-500 hover:text-black transition-all"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-orange-500 hover:text-black transition-all"><Twitter size={20} /></a>
              <a href="https://my-store-1100822-2.creator-spring.com/" target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-orange-500 hover:text-black transition-all"><ShoppingBag size={20} /></a>
            </div>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8">Support & Operations</h4>
             <ul className="space-y-4 uppercase text-[10px] font-black text-zinc-400">
               <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
               <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">Size Guide</button></li>
               <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Contact Dept</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8">Network Nodes</h4>
             <ul className="space-y-4 uppercase text-[10px] font-black text-zinc-400">
               <li><a href="#" className="hover:text-white transition-colors">Ambassador Node</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Crypto Rewards</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Wholesale Orders</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Hustle DAO</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
           <p className="text-[9px] uppercase font-bold tracking-[0.4em] text-zinc-700">&copy; 2026 HU$TLE APPAREL INC. BUILT FOR THE GRIND.</p>
           <div className="flex gap-10 text-[9px] uppercase font-bold tracking-widest text-zinc-700">
             <a href="#">Privacy Protocol</a>
             <a href="#">Terms of Existence</a>
           </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
        checkoutLoading={false}
      />

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f0f0f] border border-white/10 p-8 md:p-12 w-full max-w-2xl relative z-10 rounded-2xl" id="size-guide-modal"
            >
              <button 
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-orange-500 p-3 rounded-lg"><Ruler className="text-black" /></div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Hustler Size Intel</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Find your weapon fit</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-10 overflow-x-auto min-w-[400px]">
                 {['Size', 'Chest', 'Length', 'Shoulder', 'Sleeve'].map(h => (
                   <div key={h} className="text-[10px] uppercase font-black text-zinc-500 pb-2 border-b border-white/10">{h}</div>
                 ))}
                 {['S', '36-38"', '28"', '18"', '8"'].map(v => <div key={v} className="text-xs font-mono py-3 border-b border-white/5">{v}</div>)}
                 {['M', '38-40"', '29"', '19"', '8.5"'].map(v => <div key={v} className="text-xs font-mono py-3 border-b border-white/5 font-bold text-orange-500">{v}</div>)}
                 {['L', '42-44"', '30"', '20"', '9"'].map(v => <div key={v} className="text-xs font-mono py-3 border-b border-white/5">{v}</div>)}
                 {['XL', '46-48"', '31"', '21"', '9.5"'].map(v => <div key={v} className="text-xs font-mono py-3 border-b border-white/5">{v}</div>)}
              </div>

              <div className="bg-white/5 p-6 rounded-lg text-sm text-zinc-400 leading-relaxed italic">
                "Our gear is tailored for a modern streetwear silhouette. If you prefer a loose 'hustle' look, size up for a relaxed fit."
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@500;700&display=swap');
      `}} />
    </div>
  );
}
