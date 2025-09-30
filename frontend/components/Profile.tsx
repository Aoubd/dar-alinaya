import React, { useContext, useState } from 'react';
import { AppContext, Order } from '../context/AppContext';

interface ProfileProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const Profile: React.FC<ProfileProps> = ({ setActiveView }) => {
    const { config, language, currentUser, orders } = useContext(AppContext);
    const { profile: labels } = config.textContent;
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    if (!currentUser) {
        // This should not happen if navigated correctly, but as a fallback
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <p>Please log in to view your profile.</p>
                <button onClick={() => setActiveView({ page: 'home' })}>Go Home</button>
            </div>
        );
    }
    
    const userOrders = orders.filter(order => order.userId === currentUser.id);

    return (
        <section className="py-24 md:py-32 animate-fade-in-up">
            <div className={`container mx-auto px-4 max-w-4xl ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
                    <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
                        {labels.title[language]}
                    </span>
                </h1>
                <p className="mt-2 text-xl">{config.textContent.auth.welcome[language]}, {currentUser.name}!</p>
                
                <div className="mt-12">
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
        </section>
    );
};

export default Profile;