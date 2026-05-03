import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-[#0F0F0F] border border-white/5 overflow-hidden transition-all hover:border-orange-500/50"
      id={`product-${product.id}`}
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white text-black px-2 py-0.5 text-[10px] uppercase font-black tracking-tighter">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <div className="w-full flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-white text-black py-3 font-bold uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors"
            >
              <ShoppingBag size={12} /> Bag It
            </button>
            <a 
              href={product.link} 
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-orange-500 text-black py-3 font-black uppercase text-[11px] flex items-center justify-center gap-2"
            >
              Secure Yours <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold uppercase tracking-tighter leading-tight max-w-[70%]">
            {product.name}
          </h3>
          <span className="text-orange-500 font-mono font-bold">${product.price}</span>
        </div>
        <p className="text-zinc-500 text-xs line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {product.colors.map(color => (
              <div 
                key={color} 
                className="w-3 h-3 rounded-full border border-white/20" 
                style={{ backgroundColor: color.toLowerCase() === 'sand' ? '#C2B280' : color.toLowerCase() }} 
                title={color}
              />
            ))}
          </div>
          <a 
            href={product.link} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            Spring Store <ChevronRight size={10} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
