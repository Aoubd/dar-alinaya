
import React, { useState, useContext, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import { AppProvider, AppContext } from './context/AppContext';
import PageSkeleton from './views/PageSkeleton';

// Lazy load page components from the new 'views' directory
const Hero = lazy(() => import('./views/Hero'));
const AboutUs = lazy(() => import('./views/AboutUs'));
const Store = lazy(() => import('./views/Store'));
const Booking = lazy(() => import('./views/Booking'));
const ContactUs = lazy(() => import('./views/ContactUs'));
const AdminPanel = lazy(() => import('./views/AdminPanel'));
const ProductDetail = lazy(() => import('./views/ProductDetail'));
const Checkout = lazy(() => import('./views/Checkout'));
const OrderConfirmation = lazy(() => import('./views/OrderConfirmation'));
const Profile = lazy(() => import('./views/Profile'));


// This component consumes the context and renders the UI
const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<{ page: string; context?: any }>({ page: 'home' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { config, language } = useContext(AppContext);

  // Effect to update html lang and dir attributes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // SEO Effect
  useEffect(() => {
    const { seo, store } = config.textContent;
    const baseUrl = "https://dar-al-inaya.com"; // Base URL for the site
    let currentPageSeo = (seo as any)[activeView.page] || seo.home;
    let pagePath = activeView.page === 'home' ? '/' : `/${activeView.page}`;
    let structuredData: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": baseUrl,
      "name": "دار العناية",
    };

    let title = currentPageSeo.title[language];
    let description = currentPageSeo.description[language];
    let imageUrl = "https://archive.org/download/chat-gpt-image-sep-28-2025-10-17-34-am_202509/ChatGPT%20Image%20Sep%2028%2C%202025%2C%2010_17_34%20AM.png"; // Default image

    if (activeView.page === 'productDetail' && activeView.context?.productId) {
        const product = store.products.find(p => p.id === activeView.context.productId);
        if (product) {
            title = `${product.name[language]} | ${config.textContent.nav.store[language]}`;
            description = product.description[language].substring(0, 160);
            pagePath = `/product/${product.id}`;
            imageUrl = product.imageUrl;

            structuredData = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": product.name[language],
                "image": product.imageUrl,
                "description": product.description[language],
                "offers": {
                    "@type": "Offer",
                    "url": `${baseUrl}${pagePath}`,
                    "priceCurrency": "SAR",
                    "price": parseFloat(product.price),
                    "availability": "https://schema.org/InStock"
                }
            };
        }
    } else if (activeView.page === 'store') {
        structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": store.title[language],
            "description": store.description[language],
            "itemListElement": store.products.map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Product",
                    "name": product.name[language],
                    "url": `${baseUrl}/product/${product.id}`,
                    "image": product.imageUrl,
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "SAR",
                        "price": parseFloat(product.price)
                    }
                }
            }))
        };
    }

    const canonicalUrl = `${baseUrl}${pagePath}`;

    // Update Meta Tags
    document.getElementById('meta-title')!.innerHTML = title;
    document.getElementById('meta-description')!.setAttribute('content', description);
    document.getElementById('canonical-link')!.setAttribute('href', canonicalUrl);
    
    // Update Open Graph tags
    document.getElementById('og-title')!.setAttribute('content', title);
    document.getElementById('og-description')!.setAttribute('content', description);
    document.getElementById('og-url')!.setAttribute('content', canonicalUrl);
    document.getElementById('og-image')!.setAttribute('content', imageUrl);

    // Update Twitter Card tags
    document.getElementById('twitter-title')!.setAttribute('content', title);
    document.getElementById('twitter-description')!.setAttribute('content', description);
    document.getElementById('twitter-url')!.setAttribute('content', canonicalUrl);
    document.getElementById('twitter-image')!.setAttribute('content', imageUrl);

    // Update Structured Data
    document.getElementById('json-ld-structured-data')!.innerHTML = JSON.stringify(structuredData);

  }, [activeView, language, config]);


  // Inject CSS variables for dynamic theming
  const dynamicStyles = `
    :root {
      --primary-color: ${config.theme.primary};
      --secondary-color: ${config.theme.secondary};
      --text-color: ${config.theme.text};
      --text-strong-color: ${config.theme.textStrong};
      --background-color: ${config.theme.background};
      --card-background-color: ${config.theme.cardBackground};
      --input-background-color: ${config.theme.inputBackground};
      --border-color: ${config.theme.border};
    }
    .text-gradient-primary-secondary {
      background-image: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    }
    .hover-text-primary:hover {
        color: var(--primary-color);
    }
    .ring-primary:focus {
        --tw-ring-color: var(--primary-color);
    }
  `;

  return (
    <div 
      className="min-h-screen selection:bg-blue-500 selection:text-white flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)'
      }}
    >
      <style>{dynamicStyles}</style>
      
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        openAuthModal={() => setIsAuthModalOpen(true)}
        openCartModal={() => setIsCartModalOpen(true)}
      />
      
      <main className="flex-grow">
        <Suspense fallback={<PageSkeleton activeView={activeView.page} />}>
            {activeView.page === 'admin' ? (
              <AdminPanel setActiveView={setActiveView} />
            ) : activeView.page === 'productDetail' && activeView.context?.productId ? (
              <ProductDetail productId={activeView.context.productId} setActiveView={setActiveView} />
            ) : activeView.page === 'checkout' ? (
              <Checkout setActiveView={setActiveView} />
            ) : activeView.page === 'orderConfirmation' && activeView.context?.orderId ? (
              <OrderConfirmation orderId={activeView.context.orderId} setActiveView={setActiveView} />
            ) : activeView.page === 'profile' ? (
              <Profile setActiveView={setActiveView} />
            ) : (
              <div className="container mx-auto px-4">
                {activeView.page === 'home' && <Hero setActiveView={setActiveView} />}
                {activeView.page === 'about' && <AboutUs setActiveView={setActiveView} />}
                {activeView.page === 'store' && <Store setActiveView={setActiveView} />}
                {activeView.page === 'booking' && <Booking />}
                {activeView.page === 'contact' && <ContactUs />}
              </div>
            )}
        </Suspense>
      </main>
      
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
        setActiveView={setActiveView}
      />
    </div>
  );
}

// The main App component now just sets up the provider
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
