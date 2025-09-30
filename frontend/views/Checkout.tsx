
import React, { useState, useContext, useEffect } from 'react';
import { AppContext, CartItem } from '../context/AppContext';

interface CheckoutProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);


const Checkout: React.FC<CheckoutProps> = ({ setActiveView }) => {
    const { config, language, cart, placeOrder, currentUser } = useContext(AppContext);
    const { checkout: checkoutLabels } = config.textContent;
    
    const [step, setStep] = useState('shipping'); // shipping, payment, summary
    const [shippingDetails, setShippingDetails] = useState({
        fullName: currentUser?.address?.fullName || currentUser?.name || '',
        address: currentUser?.address?.address || '',
        city: currentUser?.address?.city || '',
        country: currentUser?.address?.country || '',
    });

    useEffect(() => {
        if (currentUser) {
            setShippingDetails({
                fullName: currentUser.address?.fullName || currentUser.name || '',
                address: currentUser.address?.address || '',
                city: currentUser.address?.city || '',
                country: currentUser.address?.country || '',
            });
        }
    }, [currentUser]);

    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(' SAR', ''));
        return sum + price * item.quantity;
    }, 0);
    // Assuming simple shipping and taxes for now
    const total = subtotal;

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = () => {
        const newOrder = placeOrder(cart, shippingDetails, total);
        setActiveView({ page: 'orderConfirmation', context: { orderId: newOrder.id }});
    };
    
    if (cart.length === 0 && step !== 'confirmation') {
        return (
             <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-2xl font-bold" style={{color: 'var(--text-strong-color)'}}>سلتك فارغة</h2>
                <p className="mt-2" style={{color: 'var(--text-color)'}}>أضف منتجات إلى سلتك أولاً.</p>
                <button onClick={() => setActiveView({ page: 'store' })} className="mt-6 px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90">
                    العودة للمتجر
                </button>
            </div>
        )
    }

    const steps = [
        { id: 'shipping', title: checkoutLabels.stepShipping[language] },
        { id: 'payment', title: checkoutLabels.stepPayment[language] },
        { id: 'summary', title: checkoutLabels.stepSummary[language] },
    ];
    const currentStepIndex = steps.findIndex(s => s.id === step);
    
    const inputStyle: React.CSSProperties = {
        backgroundColor: 'var(--input-background-color)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-strong-color)'
    };

    return (
        <section className="py-24 md:py-32 animate-fade-in-up">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
                    <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
                        {checkoutLabels.title[language]}
                    </span>
                </h1>
                
                <div className={`mt-16 border rounded-2xl shadow-lg p-8 ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)' }}>
                    {/* Progress Bar */}
                    <div className="mb-12">
                         <ol className="flex items-center w-full">
                            {steps.map((s, index) => (
                                <li key={s.id} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""}`} style={{'--after-border-color': 'var(--border-color)'} as React.CSSProperties}>
                                <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${currentStepIndex >= index ? 'bg-[var(--primary-color)] text-white' : ''}`}
                                    style={ currentStepIndex < index ? { backgroundColor: 'var(--input-background-color)', color: 'var(--text-color)' } : {}}
                                >
                                    {currentStepIndex > index ? <CheckIcon /> : index + 1}
                                </span>
                                </li>
                            ))}
                        </ol>
                        <ol className="flex items-center w-full mt-3 text-sm font-medium text-center">
                            {steps.map((s, index) => (
                                <li key={s.id} className={`w-full ${currentStepIndex >= index ? 'text-[var(--primary-color)]' : 'text-gray-500'}`} style={currentStepIndex < index ? { color: 'var(--text-color)' } : {}}>
                                    {s.title}
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Step Content */}
                    <div>
                        {step === 'shipping' && (
                            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4 max-w-lg mx-auto">
                                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{checkoutLabels.shippingTitle[language]}</h2>
                                <input type="text" name="fullName" value={shippingDetails.fullName} onChange={handleShippingChange} placeholder={checkoutLabels.fullName[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                <input type="text" name="address" value={shippingDetails.address} onChange={handleShippingChange} placeholder={checkoutLabels.address[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="city" value={shippingDetails.city} onChange={handleShippingChange} placeholder={checkoutLabels.city[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                    <input type="text" name="country" value={shippingDetails.country} onChange={handleShippingChange} placeholder={checkoutLabels.country[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                </div>
                                <div className="pt-4 text-right">
                                    <button type="submit" className="px-8 py-3 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90">{checkoutLabels.continueToPayment[language]}</button>
                                </div>
                            </form>
                        )}
                        {step === 'payment' && (
                             <form onSubmit={(e) => { e.preventDefault(); setStep('summary'); }} className="space-y-4 max-w-lg mx-auto">
                                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{checkoutLabels.paymentTitle[language]}</h2>
                                <input type="text" placeholder={checkoutLabels.cardNumber[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder={checkoutLabels.expiryDate[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                    <input type="text" placeholder={checkoutLabels.cvc[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <button type="button" onClick={() => setStep('shipping')} className="text-sm hover:underline" style={{ color: 'var(--text-color)' }}>{checkoutLabels.backToShipping[language]}</button>
                                    <button type="submit" className="px-8 py-3 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90">{checkoutLabels.continueToSummary[language]}</button>
                                </div>
                            </form>
                        )}
                        {step === 'summary' && (
                            <div className="max-w-lg mx-auto">
                                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{checkoutLabels.summaryTitle[language]}</h2>
                                <div className="p-4 border rounded-lg space-y-4" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--background-color)'}}>
                                    <div>
                                        <h3 className="font-semibold">{checkoutLabels.shippingTo[language]}</h3>
                                        <p>{shippingDetails.fullName}, {shippingDetails.address}, {shippingDetails.city}, {shippingDetails.country}</p>
                                    </div>
                                    <div className="border-t pt-4" style={{borderColor: 'var(--border-color)'}}>
                                        <h3 className="font-semibold mb-2">{checkoutLabels.orderSummary[language]}</h3>
                                        {cart.map((item: CartItem) => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <span>{item.name[language]} x{item.quantity}</span>
                                                <span>{(parseFloat(item.price) * item.quantity).toFixed(2)} SAR</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t" style={{borderColor: 'var(--border-color)'}}>
                                            <span>{checkoutLabels.total[language]}</span>
                                            <span>{total.toFixed(2)} SAR</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-6">
                                    <button type="button" onClick={() => setStep('payment')} className="text-sm hover:underline" style={{ color: 'var(--text-color)' }}>{checkoutLabels.backToPayment[language]}</button>
                                    <button onClick={handlePlaceOrder} className="px-8 py-3 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90">{checkoutLabels.placeOrder[language]}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
