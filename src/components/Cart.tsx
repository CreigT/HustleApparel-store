import React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: (Product & { quantity: number })[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, q: number) => void;
  onCheckout: () => void;
  checkoutLoading: boolean;
}

export default function Cart({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout, checkoutLoading }: CartProps) {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
            id="shopping-cart-drawer"
          >
            <div className="p-6 border-bottom border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-orange-500" />
                <h2 className="text-xl font-bold uppercase tracking-tighter">Your Bag ({items.length})</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                id="close-cart-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center">
                  <ShoppingBag size={48} className="mb-4 opacity-10" />
                  <p className="uppercase text-xs font-bold tracking-widest">Inventory Empty</p>
                  <button onClick={onClose} className="mt-4 text-orange-500 uppercase text-xs font-black underline underline-offset-4">Start Hunting</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 aspect-[3/4] bg-zinc-900 border border-white/5 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-bold uppercase tracking-tighter leading-tight">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-zinc-600 hover:text-red-500">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/10 rounded overflow-hidden">
                          <button 
                            onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 hover:bg-white/5 text-xs"
                          >-</button>
                          <span className="px-3 py-1 text-xs font-mono border-x border-white/10">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-white/5 text-xs"
                          >+</button>
                        </div>
                        <span className="text-sm font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/40">
              <div className="flex justify-between items-center mb-6">
                <span className="uppercase text-xs font-bold text-zinc-500 tracking-[0.2em]">Total Amount</span>
                <span className="text-2xl font-black tracking-tighter">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                disabled={items.length === 0 || checkoutLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:opacity-50 text-black font-black uppercase text-sm py-4 rounded flex items-center justify-center gap-2 group transition-all"
                id="checkout-btn"
              >
                {checkoutLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>Secure Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
              <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase font-bold tracking-widest">
                Protected by Hustle Encryption
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
