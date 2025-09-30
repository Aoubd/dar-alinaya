import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveView: (view: { page: string; context?: any }) => void;
}

const TrashIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, setActiveView }) => {
    const { config, language, cart, updateCartItemQuantity, removeFromCart } = useContext(AppContext);
    const { cart: cartLabels } = config.textContent;

    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(' SAR', ''));
        return sum + price * item.quantity;
    }, 0);

    const handleCheckout = () => {
        onClose();
        setActiveView({ page: 'checkout' });
    };
    
    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`fixed top-0 h-full w-full max-w-md shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${language === 'ar' ? 'left-auto right-0' : 'right-auto left-0'}`}
                style={{
                    backgroundColor: 'var(--background-color)',
                    transform: isOpen ? 'translateX(0)' : (language === 'ar' ? 'translateX(100%)' : 'translateX(-100%)')
                }}
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-strong-color)' }}>{cartLabels.title[language]}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--input-background-color)]" aria-label="Close cart">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6" style={{ color: 'var(--text-color)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div className="flex-grow p-6 overflow-y-auto">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center" style={{ color: 'var(--text-color)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24 mb-4 opacity-50"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993-1.263 12c-.07.658-.663 1.143-1.33 1.143H5.738c-.667 0-1.26-.485-1.33-1.143l-1.263-12A1.125 1.125 0 0 1 4.244 8.25h15.512a1.125 1.125 0 0 1 1.12 1.257Z" /></svg>
                            <p className="text-xl">{cartLabels.emptyMessage[language]}</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map(item => (
                                <li key={item.id} className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--card-background-color)' }}>
                                    <img src={item.imageUrl} alt={item.name[language]} className="w-24 h-24 rounded-md object-cover" />
                                    <div className="flex-grow flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold" style={{ color: 'var(--text-strong-color)' }}>{item.name[language]}</h3>
                                            <p className="font-semibold text-lg" style={{ color: 'var(--primary-color)' }}>{item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-2 border rounded-full" style={{ borderColor: 'var(--border-color)' }}>
                                                <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold">-</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 hover:underline text-sm flex items-center gap-1">
                                                <TrashIcon/>
                                                <span>{cartLabels.remove[language]}</span>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <footer className="p-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="font-semibold" style={{ color: 'var(--text-strong-color)' }}>{cartLabels.subtotal[language]}</span>
                            <span className="font-bold" style={{ color: 'var(--text-strong-color)' }}>{subtotal.toFixed(2)} SAR</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="w-full px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300" 
                            style={{ '--tw-ring-offset-color': 'var(--background-color)' } as React.CSSProperties}
                        >
                            {cartLabels.checkout[language]}
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CartModal;