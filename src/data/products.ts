export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Tees' | 'Hoodies' | 'Long Sleeves';
  image: string;
  link: string;
  colors: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 'hustle-premium-tee',
    name: 'Hu$tle APPAREL Premium Tee',
    price: 27.99,
    category: 'Tees',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    link: 'https://my-store-1100822-2.creator-spring.com/listing/buy-hu-tle-apparel?product=212',
    colors: ['Black', 'Navy', 'White'],
    description: 'The signature Hu$tle heavyweight tee. Engineered for the daily grind with a premium streetwear cut.'
  },
  {
    id: 'calivibez-hustle-hoodie',
    name: 'CaliVibez Edition HU$TLE Hoodie',
    price: 48.99,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    link: 'https://my-store-1100822-2.creator-spring.com/listing/calivibez-edition-hu-tle-appar?product=212',
    colors: ['Black', 'Heather Gray', 'Sand'],
    description: 'Special Edition CaliVibez drop. Ultra-soft fleece lining with the iconic Hu$tle branding.'
  },
  {
    id: 'hustle-signature-hoodie',
    name: 'HU$TLE Apparel Signature Hoodie',
    price: 45.99,
    category: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    link: 'https://my-store-1100822-2.creator-spring.com/listing/get-hu-tle-apparel?product=212',
    colors: ['Black', 'Midnight'],
    description: 'The foundation of your streetwear rotation. High-density embroidery on premium cotton.'
  },
  {
    id: 'hustle-stealth-longsleeve',
    name: 'HU$TLE Stealth Long Sleeve',
    price: 32.99,
    category: 'Long Sleeves',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop',
    link: 'https://my-store-1100822-2.creator-spring.com/listing/new-hu-tle-apparel?product=11',
    colors: ['Black', 'Deep Charcoal'],
    description: 'Clean, minimal, and lethal. The stealth edition for those who operate in the shadows.'
  },
  {
    id: 'hustle-new-drop-tee',
    name: 'NEW HU$TLE Apparel Tee',
    price: 25.99,
    category: 'Tees',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    link: 'https://my-store-1100822-2.creator-spring.com/listing/new-hu-tle-apparel?product=2',
    colors: ['Black', 'White'],
    description: 'Fresh drop from the Hustle lab. Modern fit with high-quality screen printing.'
  }
];
