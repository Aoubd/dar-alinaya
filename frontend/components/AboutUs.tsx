import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface AboutUsProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ setActiveView }) => {
  const { config, language } = useContext(AppContext);
  const { about } = config.textContent;

  return (
    <section className="py-24 md:py-32 text-center animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
          <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
            {about.title[language]}
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{color: 'var(--text-color)'}}>
          {about.description[language]}
        </p>

        <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className="p-8 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--card-background-color)' }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-strong-color)' }}>{about.visionTitle[language]}</h3>
                <p className="leading-relaxed" style={{color: 'var(--text-color)'}}>
                    {about.visionText[language]}
                </p>
            </div>
            <div className="p-8 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--card-background-color)' }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-strong-color)' }}>{about.missionTitle[language]}</h3>
                <p className="leading-relaxed" style={{color: 'var(--text-color)'}}>
                    {about.missionText[language]}
                </p>
            </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveView({ page: 'booking' }); }}
                className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300"
                style={{ '--tw-ring-offset-color': 'var(--background-color)'} as React.CSSProperties}
            >
                {about.primaryCta[language]}
            </a>
            <a
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveView({ page: 'store' }); }}
                className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold rounded-full hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-300"
                style={{ 
                    color: 'var(--primary-color)', 
                    backgroundColor: 'var(--card-background-color)',
                    '--tw-ring-offset-color': 'var(--background-color)'
                } as React.CSSProperties}
            >
                {about.secondaryCta[language]}
            </a>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;