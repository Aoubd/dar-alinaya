
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import CogIcon from './icons/CogIcon';
import UserIcon from './icons/UserIcon';
import ThemeIcon from './icons/ThemeIcon';
import LangArIcon from './icons/LangArIcon';
import LangEnIcon from './icons/LangEnIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

interface NavbarProps {
  activeView: { page: string; context?: any };
  setActiveView: (view: { page: string; context?: any }) => void;
  openAuthModal: () => void;
  openCartModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, openAuthModal, openCartModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { config, isAuthenticated, currentUser, logout, themeMode, toggleTheme, language, toggleLanguage, cart } = useContext(AppContext);
  const { nav: navLabels, auth: authLabels } = config.textContent;

  const navLinks = [
    { id: 'home', name: navLabels.home[language], href: '/' },
    { id: 'about', name: navLabels.about[language], href: '/about' },
    { id: 'store', name: navLabels.store[language], href: '/store' },
    { id: 'booking', name: navLabels.booking[language], href: '/booking' },
    { id: 'contact', name: navLabels.contact[language], href: '/contact' },
  ];
  
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    setActiveView({ page });
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };
  
  const handleLogout = () => {
      logout();
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
  }

  return (
    <header className="py-6 relative z-10 transition-colors duration-300" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <a href="/" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-3">
            <img
              src="https://archive.org/download/chat-gpt-image-sep-28-2025-10-17-34-am_202509/ChatGPT%20Image%20Sep%2028%2C%202025%2C%2010_17_34%20AM.png"
              alt="شعار"
              className="w-14 h-14 object-contain"
            />
          </a>
          
          <div className="hidden md:flex items-center gap-x-8">
            <ul className="flex items-center gap-x-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`transition-colors duration-300 text-lg relative group ${activeView.page === link.id ? 'font-semibold' : 'hover-text-primary'}`}
                    style={{ color: activeView.page === link.id ? 'var(--primary-color)' : 'var(--text-color)' }}
                  >
                    <span>{link.name}</span>
                    <span className={`absolute bottom-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 ${activeView.page === link.id ? 'w-full' : 'w-0 group-hover:w-full'}${language === 'ar' ? ' right-0' : ' left-0'}`}></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-x-2">
                <button
                    onClick={openCartModal}
                    className="relative p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors"
                    aria-label="Open Shopping Cart"
                >
                    <ShoppingBagIcon className="w-6 h-6" style={{ color: 'var(--text-color)' }} />
                    {totalCartItems > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                            {totalCartItems}
                        </span>
                    )}
                </button>
                <button
                    onClick={toggleLanguage}
                    className="p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors"
                    aria-label="Toggle Language"
                >
                    {language === 'ar' ? <LangEnIcon className="w-6 h-6" style={{ color: 'var(--text-color)' }} /> : <LangArIcon className="w-6 h-6" style={{ color: 'var(--text-color)' }} />}
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors"
                    aria-label="Toggle theme"
                >
                    <ThemeIcon themeMode={themeMode} className="w-6 h-6" style={{ color: 'var(--text-color)' }} />
                </button>
                {isAuthenticated ? (
                    <div className="relative" ref={userMenuRef}>
                       <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors">
                           <span style={{color: 'var(--text-strong-color)'}} className="font-semibold">{currentUser?.name}</span>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                       </button>
                       {isUserMenuOpen && (
                           <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5`} style={{backgroundColor: 'var(--card-background-color)'}}>
                               <a href="/profile" onClick={(e) => handleLinkClick(e, 'profile')} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--input-background-color)]" style={{color: 'var(--text-strong-color)'}}><ProfileIcon className="w-5 h-5"/> {config.textContent.profile.title[language]}</a>
                               {(currentUser?.role === 'Admin' || currentUser?.role === 'Staff') && (
                                   <a href="/admin" onClick={(e) => handleLinkClick(e, 'admin')} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--input-background-color)]" style={{color: 'var(--text-strong-color)'}}><CogIcon className="w-5 h-5"/> {authLabels.adminPanel[language]}</a>
                               )}
                               <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10">
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3h12" /></svg>
                                   {authLabels.logout[language]}
                               </a>
                           </div>
                       )}
                    </div>
                ) : (
                    <button
                        onClick={openAuthModal}
                        className="p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors"
                        aria-label="Open Login"
                    >
                        <UserIcon className="w-6 h-6" style={{ color: 'var(--text-color)' }}/>
                    </button>
                )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
              <button
                  onClick={openCartModal}
                  className="relative p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors z-20"
                  aria-label="Open Shopping Cart"
              >
                  <ShoppingBagIcon className="w-6 h-6" style={{ color: 'var(--text-strong-color)' }} />
                  {totalCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                          {totalCartItems}
                      </span>
                  )}
              </button>
              <button
                    onClick={toggleLanguage}
                    className="p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors z-20"
                    aria-label="Toggle Language"
                >
                    {language === 'ar' ? <LangEnIcon className="w-6 h-6" style={{ color: 'var(--text-strong-color)' }} /> : <LangArIcon className="w-6 h-6" style={{ color: 'var(--text-strong-color)' }} />}
                </button>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-[var(--input-background-color)] transition-colors z-20"
                    aria-label="Toggle theme"
                >
                    <ThemeIcon themeMode={themeMode} className="w-6 h-6" style={{ color: 'var(--text-strong-color)' }} />
                </button>
              <button
                className="z-20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={isMenuOpen}
                style={{ color: 'var(--text-strong-color)' }}
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <>
        <div
            className={`fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden={!isMenuOpen}
        ></div>
        <div
            className={`fixed top-0 h-full w-4/5 max-w-sm z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${language === 'ar' ? 'right-0' : 'left-0'}`}
            style={{
                backgroundColor: 'var(--background-color)',
                transform: isMenuOpen ? 'translateX(0)' : (language === 'ar' ? 'translateX(100%)' : 'translateX(-100%)'),
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
        >
            {isMenuOpen && (
            <>
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <a href="/" onClick={(e) => handleLinkClick(e, 'home')} className="flex items-center gap-2">
                        <img
                        src="https://archive.org/download/chat-gpt-image-sep-28-2025-10-17-34-am_202509/ChatGPT%20Image%20Sep%2028%2C%202025%2C%2010_17_34%20AM.png"
                        alt="شعار"
                        className="w-10 h-10 object-contain"
                        />
                        <h2 id="mobile-menu-title" className="text-lg font-bold" style={{ color: 'var(--text-strong-color)' }}>{config.textContent.nav.home[language]}</h2>
                    </a>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="إغلاق القائمة"
                        className="p-2 rounded-full hover:bg-[var(--input-background-color)]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--text-color)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex-grow flex flex-col justify-between overflow-y-auto">
                    <nav className="p-6">
                        <ul className="flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                            <a
                                href={link.href}
                                className={`transition-colors duration-300 text-xl font-semibold hover-text-primary block p-3 rounded-lg ${activeView.page === link.id ? 'bg-[var(--input-background-color)]' : ''}`}
                                style={{ color: activeView.page === link.id ? 'var(--primary-color)' : 'var(--text-strong-color)' }}
                                onClick={(e) => handleLinkClick(e, link.id)}
                            >
                                {link.name}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </nav>

                    <div className="p-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        {isAuthenticated ? (
                        <div className="space-y-3">
                            <div className="text-center mb-4">
                                <span className="block text-lg font-semibold" style={{color: 'var(--text-strong-color)'}}>{authLabels.welcome[language]}، {currentUser?.name}</span>
                            </div>
                            <a href="/profile" onClick={(e) => handleLinkClick(e, 'profile')} className="flex items-center gap-3 text-lg font-semibold hover-text-primary p-3 rounded-lg hover:bg-[var(--input-background-color)]" style={{color: 'var(--text-strong-color)'}}><ProfileIcon className="w-6 h-6"/> {config.textContent.profile.title[language]}</a>
                             {(currentUser?.role === 'Admin' || currentUser?.role === 'Staff') && (
                                <a href="/admin" onClick={(e) => handleLinkClick(e, 'admin')} className="flex items-center gap-3 text-lg font-semibold hover-text-primary p-3 rounded-lg hover:bg-[var(--input-background-color)]" style={{color: 'var(--text-strong-color)'}}><CogIcon className="w-6 h-6"/> {authLabels.adminPanel[language]}</a>
                             )}
                            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center gap-3 text-lg font-semibold text-red-500 hover:text-red-700 p-3 rounded-lg hover:bg-red-500/10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3h12" /></svg>
                                {authLabels.logout[language]}
                            </a>
                        </div>
                        ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); openAuthModal(); setIsMenuOpen(false); }} className="w-full text-center flex items-center justify-center gap-2 text-xl font-semibold hover-text-primary p-3 rounded-lg" style={{color: 'var(--text-strong-color)', backgroundColor: 'var(--input-background-color)'}}>
                            <UserIcon className="w-6 h-6" /> {authLabels.login[language]}
                        </a>
                        )}
                    </div>
                </div>

            </>
            )}
        </div>
      </>
    </header>
  );
};

export default Navbar;
