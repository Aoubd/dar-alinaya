import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface OrderConfirmationProps {
  orderId: number;
  setActiveView: (view: { page: string; context?: any }) => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, setActiveView }) => {
    const { config, language } = useContext(AppContext);
    const { orderConfirmation: labels } = config.textContent;

    return (
        <section className="py-24 md:py-32 animate-fade-in-up">
            <div className="max-w-4xl mx-auto text-center">
                <div className="p-8 rounded-2xl shadow-lg" style={{ backgroundColor: 'var(--card-background-color)'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4xl md:text-5xl font-extrabold mt-6" style={{ color: 'var(--text-strong-color)' }}>
                        {labels.title[language]}
                    </h1>
                    <p className="mt-4 text-lg" style={{ color: 'var(--text-color)' }}>
                        {labels.subtitle[language]}
                    </p>
                    <div className="mt-6 text-lg font-semibold p-4 rounded-lg inline-block" style={{ backgroundColor: 'var(--input-background-color)'}}>
                        {labels.orderNumber[language]} <span style={{ color: 'var(--primary-color)'}}>{orderId}</span>
                    </div>
                    <div className="mt-10">
                        <button
                            onClick={() => setActiveView({ page: 'store' })}
                            className="px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 transition-all"
                        >
                            {labels.continueShopping[language]}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmation;