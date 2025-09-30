import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25a2.25 2.25 0 0 1-2.25-2.25H5.25A2.25 2.25 0 0 1 3 18.75Z" />
    </svg>
);

const ShoppingBagIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993-1.263 12c-.07.658-.663 1.143-1.33 1.143H5.738c-.667 0-1.26-.485-1.33-1.143l-1.263-12A1.125 1.125 0 0 1 4.244 8.25h15.512a1.125 1.125 0 0 1 1.12 1.257Z" />
    </svg>
);

interface HeroProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveView }) => {
  const { config, language } = useContext(AppContext);
  const { hero } = config.textContent;

  return (
    <main className="py-24 md:py-32 text-center animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
            <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
                {hero.title[language]}
            </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto" style={{color: 'var(--text-color)'}}>
            {hero.subtitle[language]}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveView({ page: 'booking' }); }}
            className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300 flex items-center justify-center gap-2"
            style={{ '--tw-ring-offset-color': 'var(--background-color)'} as React.CSSProperties}
          >
            {hero.primaryCta[language]}
            <CalendarIcon />
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveView({ page: 'store' }); }}
            className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ 
                color: 'var(--primary-color)', 
                backgroundColor: 'var(--card-background-color)',
                '--tw-ring-offset-color': 'var(--background-color)'
            } as React.CSSProperties}
          >
            {hero.secondaryCta[language]}
            <ShoppingBagIcon />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Hero;