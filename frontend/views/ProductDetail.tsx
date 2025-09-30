import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TabbyLogo from '../components/icons/TabbyLogo';
import TamaraLogo from '../components/icons/TamaraLogo';


interface ProductDetailProps {
  productId: number;
  setActiveView: (view: { page: string; context?: any }) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, setActiveView }) => {
  const { config, language, addToCart } = useContext(AppContext);
  const { store } = config.textContent;
  const { paymentSettings } = config;
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = store.products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => setActiveView({ page: 'store' })} className="mt-4 text-[var(--primary-color)] hover:underline">
            {store.backToStore[language]}
        </button>
      </div>
    );
  }
  
  const showPaymentOptions = paymentSettings.tabbyEnabled || paymentSettings.tamaraEnabled;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="animate-fade-in-up">
        <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => setActiveView({ page: 'store' })} className="mb-8 text-sm font-semibold hover:underline flex items-center gap-2" style={{ color: 'var(--text-color)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                    {store.backToStore[language]}
                </button>

                <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                        src={product.imageUrl}
                        alt={product.name[language]}
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full" style={{ backgroundColor: 'var(--input-background-color)', color: 'var(--primary-color)' }}>
                            {product.category[language]}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mt-4" style={{ color: 'var(--text-strong-color)' }}>
                            {product.name[language]}
                        </h1>
                        <p className="text-3xl font-bold mt-4" style={{ color: 'var(--primary-color)' }}>
                            {product.price}
                        </p>
                        <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--text-color)' }}>
                            {product.description[language]}
                        </p>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex items-center gap-2 border rounded-full p-2" style={{ borderColor: 'var(--border-color)' }}>
                                <span className="font-semibold text-sm px-2">{store.quantity[language]}</span>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 font-bold rounded-full hover:bg-[var(--input-background-color)]">-</button>
                                <span className="px-4 font-bold text-lg w-12 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 font-bold rounded-full hover:bg-[var(--input-background-color)]">+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={added}
                                className="flex-grow px-8 py-4 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ '--tw-ring-offset-color': 'var(--background-color)' } as React.CSSProperties}
                            >
                                {added ? store.addedToCart[language] : store.addToCart[language]}
                            </button>
                        </div>
                        
                        {showPaymentOptions && (
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)'}}>
                                <span className="text-sm font-medium" style={{ color: 'var(--text-color)'}}>
                                    {store.paymentOptionsText[language]}
                                </span>
                                <div className="flex items-center gap-4 mt-2">
                                    {paymentSettings.tabbyEnabled && <TabbyLogo className="h-6 w-auto" />}
                                    {paymentSettings.tamaraEnabled && <TamaraLogo className="h-6 w-auto" />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetail;