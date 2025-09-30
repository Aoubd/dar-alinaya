
import React, { useContext, useState, useEffect } from 'react';
import { AppContext, Order } from '../context/AppContext';

interface ProfileProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const Profile: React.FC<ProfileProps> = ({ setActiveView }) => {
    const { config, language, currentUser, orders, updateUserAddress, updateUserPassword } = useContext(AppContext);
    const { profile: labels, checkout: checkoutLabels } = config.textContent;
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    const [address, setAddress] = useState(currentUser?.address || { fullName: '', address: '', city: '', country: '' });
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        if (currentUser) {
            setAddress(currentUser.address);
        }
    }, [currentUser]);

    if (!currentUser) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <p>Please log in to view your profile.</p>
                <button onClick={() => setActiveView({ page: 'home' })}>Go Home</button>
            </div>
        );
    }
    
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserAddress(currentUser.id, address);
        setFeedback({ type: 'success', message: labels.addressUpdated[language] });
        setTimeout(() => setFeedback(null), 3000);
    };
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        if (passwordData.new !== passwordData.confirm) {
            setFeedback({ type: 'error', message: 'New passwords do not match.' });
            return;
        }
        try {
            updateUserPassword(currentUser.id, passwordData.current, passwordData.new);
            setFeedback({ type: 'success', message: labels.passwordUpdated[language] });
            setPasswordData({ current: '', new: '', confirm: '' });
        } catch (error: any) {
            setFeedback({ type: 'error', message: error.message });
        }
        setTimeout(() => setFeedback(null), 3000);
    };

    const userOrders = orders.filter(order => order.userId === currentUser.id);
    const inputStyle: React.CSSProperties = {
        backgroundColor: 'var(--input-background-color)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-strong-color)'
    };

    return (
        <section className="py-24 md:py-32 animate-fade-in-up">
            <div className={`container mx-auto px-4 max-w-4xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
                    <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
                        {labels.title[language]}
                    </span>
                </h1>
                <p className="mt-2 text-xl">{config.textContent.auth.welcome[language]}, {currentUser.name}!</p>
                
                {feedback && (
                    <div className={`mt-4 p-3 rounded-lg text-center ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {feedback.message}
                    </div>
                )}
                
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    {/* Address & Password Forms */}
                    <div className="space-y-8">
                        {/* Shipping Address */}
                        <div className="p-6 border rounded-lg" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                             <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-strong-color)'}}>{labels.shippingAddress[language]}</h2>
                             <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} placeholder={checkoutLabels.fullName[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                <input type="text" name="address" value={address.address} onChange={handleAddressChange} placeholder={checkoutLabels.address[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder={checkoutLabels.city[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                    <input type="text" name="country" value={address.country} onChange={handleAddressChange} placeholder={checkoutLabels.country[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                </div>
                                <div className="text-right">
                                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-md hover:opacity-90">{labels.saveChanges[language]}</button>
                                </div>
                             </form>
                        </div>
                        {/* Change Password */}
                        <div className="p-6 border rounded-lg" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                             <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-strong-color)'}}>{labels.changePassword[language]}</h2>
                             <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                 <input type="password" name="current" value={passwordData.current} onChange={handlePasswordChange} placeholder={labels.currentPassword[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                 <input type="password" name="new" value={passwordData.new} onChange={handlePasswordChange} placeholder={labels.newPassword[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                 <input type="password" name="confirm" value={passwordData.confirm} onChange={handlePasswordChange} placeholder={labels.confirmNewPassword[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary" />
                                 <div className="text-right">
                                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-md hover:opacity-90">{labels.saveChanges[language]}</button>
                                 </div>
                             </form>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-strong-color)'}}>{labels.myOrders[language]}</h2>
                        {userOrders.length > 0 ? (
                            <div className="space-y-4">
                                {userOrders.map((order: Order) => (
                                    <div key={order.id} className="p-4 border rounded-lg" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                            <div>
                                                <div className="text-sm font-semibold" style={{color: 'var(--text-color)'}}>{labels.order[language]}</div>
                                                <div className="font-bold" style={{color: 'var(--text-strong-color)'}}>{order.id}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold" style={{color: 'var(--text-color)'}}>{labels.date[language]}</div>
                                                <div style={{color: 'var(--text-strong-color)'}}>{new Date(order.orderDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold" style={{color: 'var(--text-color)'}}>{labels.total[language]}</div>
                                                <div className="font-bold" style={{color: 'var(--primary-color)'}}>{order.total.toFixed(2)} SAR</div>
                                            </div>
                                            <div className="flex flex-col items-start md:items-end gap-2">
                                                <div className="text-xs font-semibold inline-flex items-center px-2.5 py-0.5 rounded-full" style={{backgroundColor: 'var(--input-background-color)', color: 'var(--text-strong-color)'}}>
                                                    {order.status}
                                                </div>
                                                <button onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} className="text-sm font-semibold text-[var(--primary-color)] hover:underline">
                                                    {labels.viewDetails[language]}
                                                </button>
                                            </div>
                                        </div>
                                        {expandedOrder === order.id && (
                                            <div className="mt-4 pt-4 border-t" style={{borderColor: 'var(--border-color)'}}>
                                                {order.items.map(item => (
                                                    <div key={item.id} className="flex items-center gap-4 py-2">
                                                        <img src={item.imageUrl} alt={item.name[language]} className="w-16 h-16 rounded-md object-cover" />
                                                        <div>
                                                            <p className="font-semibold" style={{color: 'var(--text-strong-color)'}}>{item.name[language]}</p>
                                                            <p className="text-sm" style={{color: 'var(--text-color)'}}>{item.quantity} x {item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-color)' }}>{labels.noOrders[language]}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
