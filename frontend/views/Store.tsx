import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import TabbyLogo from '../components/icons/TabbyLogo';
import TamaraLogo from '../components/icons/TamaraLogo';

const ShoppingCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.841a1.125 1.125 0 0 0-.8-1.318h-13.518L4.66 4.653A1.125 1.125 0 0 0 3.58 3H2.25" />
    </svg>
);

interface StoreProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const Store: React.FC<StoreProps> = ({ setActiveView }) => {
  const { config, language, addToCart } = useContext(AppContext);
  const { paymentSettings } = config;
  const { store } = config.textContent;

  const [selectedCategory, setSelectedCategory] = useState<string>(store.allCategories[language]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [priceRange, setPriceRange] = useState<number>(1000);

  useEffect(() => {
    if (store.products.length > 0) {
        const prices = store.products.map(p => parseFloat(p.price));
        const max = Math.ceil(Math.max(...prices));
        setMaxPrice(max);
        setPriceRange(max);
    }
  }, [store.products]);

  useEffect(() => {
    setSelectedCategory(store.allCategories[language]);
  }, [language, store.allCategories]);


  const showPaymentOptions = paymentSettings.tabbyEnabled || paymentSettings.tamaraEnabled;

  const categories = [
    store.allCategories[language],
    ...Array.from(new Set(store.products.map(p => p.category[language])))
  ];

  const filteredProducts = store.products.filter(product => {
    const categoryMatch = selectedCategory === store.allCategories[language] || product.category[language] === selectedCategory;
    const priceMatch = parseFloat(product.price) <= priceRange;
    return categoryMatch && priceMatch;
  });

  return (
    <section className="py-24 md:py-32 animate-fade-in-up">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{color: 'var(--text-strong-color)'}}>
          <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
            {store.title[language]}
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{color: 'var(--text-color)'}}>
          {store.description[language]}
        </p>

        {/* Filters */}
        <div className={`mt-12 mb-8 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6 md:gap-8 ${language === 'ar' ? 'md:text-right' : 'md:text-left'}`} style={{ backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)', border: '1px solid' }}>
            <div className='flex flex-col md:flex-row items-center gap-4 flex-wrap'>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-strong-color)' }}>{store.category[language]}:</h3>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${selectedCategory === category ? 'text-white' : 'hover:bg-[var(--input-background-color)]'}`}
                            style={{ 
                                backgroundColor: selectedCategory === category ? 'var(--primary-color)' : 'transparent',
                                color: selectedCategory === category ? 'white' : 'var(--text-strong-color)'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-1 max-w-md">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-strong-color)' }}>{store.price[language]}:</h3>
                <div className="flex-1 flex items-center gap-3">
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 rounded-lg cursor-pointer"
                    />
                    <span className="font-semibold w-24 text-center" style={{ color: 'var(--primary-color)' }}>
                        {language === 'ar' ? `حتى ${priceRange} ر.س` : `Up to ${priceRange} SAR`}
                    </span>
                </div>
            </div>
        </div>


        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
                <div key={product.id} className="group relative border rounded-2xl shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveView({ page: 'productDetail', context: { productId: product.id } }); }} className="flex flex-col flex-grow">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                            <img
                            src={product.imageUrl}
                            alt={product.name[language]}
                            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold" style={{ color: 'var(--text-strong-color)' }}>
                            {product.name[language]}
                            </h3>
                            <p className="mt-2 text-sm" style={{color: 'var(--text-color)'}}>
                                {product.description[language].substring(0, 100) + (product.description[language].length > 100 ? '...' : '')}
                            </p>
                             <div className="mt-4 flex-grow flex items-end">
                                <p className="text-xl font-semibold" style={{color: 'var(--primary-color)'}}>
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    </a>
                    <div className="p-6 pt-0">
                        <button
                            onClick={(e) => { e.preventDefault(); addToCart(product); }}
                            className="w-full px-4 py-2 text-sm font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                            style={{ '--tw-ring-offset-color': 'var(--background-color)' } as React.CSSProperties}
                        >
                            <span>{store.addToCart[language]}</span>
                            <ShoppingCartIcon />
                        </button>
                        {showPaymentOptions && (
                            <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: 'var(--border-color)'}}>
                                <span className="text-xs font-medium" style={{ color: 'var(--text-color)'}}>
                                    {store.paymentOptionsText[language]}
                                </span>
                                <div className="flex items-center justify-center gap-4 mt-2">
                                    {paymentSettings.tabbyEnabled && <TabbyLogo className="h-5 w-auto" />}
                                    {paymentSettings.tamaraEnabled && <TamaraLogo className="h-5 w-auto" />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-4 text-center py-16">
              <p className="text-xl" style={{ color: 'var(--text-color)' }}>
                {store.noProductsFound[language]}
              </p>
            </div>
          )}
        </div>

        <div className="mt-20 text-center">
          <a
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveView({ page: 'contact' }); }}
              className="inline-block px-8 py-3.5 text-lg font-semibold rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all duration-300"
              style={{ 
                  color: 'var(--primary-color)', 
                  backgroundColor: 'var(--card-background-color)',
                  '--tw-ring-offset-color': 'var(--background-color)'
              } as React.CSSProperties}
          >
              {store.cta[language]}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Store;