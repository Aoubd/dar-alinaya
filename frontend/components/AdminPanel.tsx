import React, { useState, useContext, useEffect } from 'react';
import { AppContext, Order } from '../context/AppContext';
import PaymentIcon from './icons/PaymentIcon';
import MessagesIcon from './icons/MessagesIcon';

// Icons for tabs and actions
const ContentIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
const AppearanceIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>;
const StoreIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.25a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75H15m-4.5 0v-4.5A.75.75 0 0 1 11.25 12h1.5a.75.75 0 0 1 .75.75v4.5m-4.5 0h4.5M3.75 21v-6.75A.75.75 0 0 1 4.5 13.5h15a.75.75 0 0 1 .75.75v6.75m0 0H3.75M3 12h18M3 7.5h18m-9-3.75h.008v.008H12V3.75Z" /></svg>;
const BookingIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25a2.25 2.25 0 0 1-2.25-2.25H5.25A2.25 2.25 0 0 1 3 18.75Z" /></svg>;
const OrdersIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h7.5M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.835l1.823-6.841a1.125 1.125 0 0 0-.8-1.318h-13.518L4.66 4.653A1.125 1.125 0 0 0 3.58 3H2.25" /></svg>;
const TrashIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;

interface AdminPanelProps {
  setActiveView: (view: { page: string; context?: any }) => void;
}

const LocalizedInput: React.FC<{type?: string, name: string, value: {ar: string, en: string}, onChange: any, rows?: number}> = ({type='text', name, value, onChange, rows}) => {
    const { language } = useContext(AppContext);
    const inputStyles: React.CSSProperties = {
        backgroundColor: 'var(--input-background-color)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-strong-color)',
    };
    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    return (
        <div className="grid grid-cols-2 gap-4">
            <InputComponent type={type} name={`${name}.ar`} value={value.ar} onChange={onChange} style={inputStyles} rows={rows} className="mt-1 block w-full p-2 border rounded-md shadow-sm ring-primary"/>
            <InputComponent type={type} name={`${name}.en`} value={value.en} onChange={onChange} style={inputStyles} rows={rows} className="mt-1 block w-full p-2 border rounded-md shadow-sm ring-primary" dir="ltr"/>
        </div>
    );
};

const ToggleSwitch: React.FC<{ checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string; }> = ({ checked, onChange, name }) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-11 h-6 rounded-full peer peer-focus:outline-none transition-colors" style={{backgroundColor: checked ? 'var(--primary-color)' : 'var(--input-background-color)'}}></div>
            <span className="absolute top-0.5 left-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform duration-300" style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}></span>
        </label>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ setActiveView }) => {
    const { config, setConfig, language, contactMessages, deleteContactMessage, markContactMessagesAsRead, orders } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('store');
    const [openAccordion, setOpenAccordion] = useState<string | null>('hero');
    
    const unreadMessagesCount = contactMessages.filter(msg => !msg.isRead).length;

    useEffect(() => {
        if (activeTab === 'messages' && unreadMessagesCount > 0) {
            const timer = setTimeout(() => {
                markContactMessagesAsRead();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [activeTab, unreadMessagesCount, markContactMessagesAsRead]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const [section, key, lang] = name.split('.');
        // FIX: Use deep copy to prevent state mutation and pass object to setConfig
        const newConfig = JSON.parse(JSON.stringify(config));
        (newConfig.textContent as any)[section][key][lang] = value;
        setConfig(newConfig);
    };
    
    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // FIX: Pass object to setConfig instead of functional update
        setConfig({ ...config, theme: { ...config.theme, [name]: value } });
    };
    
    const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        // FIX: Pass object to setConfig instead of functional update
        setConfig({
            ...config,
            paymentSettings: {
                ...config.paymentSettings,
                [name]: checked,
            },
        });
    };

    const handleProductChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.'); // e.g., 'name.ar'
        // FIX: Use deep copy to prevent state mutation and pass object to setConfig
        const newConfig = JSON.parse(JSON.stringify(config));
        const productToUpdate = newConfig.textContent.store.products[index];
        if (keys.length === 2) { // localized field
            (productToUpdate as any)[keys[0]][keys[1]] = value;
        } else { // non-localized field
            (productToUpdate as any)[name] = value;
        }
        setConfig(newConfig);
    };

    const handleAddProduct = () => {
        const newProduct = { 
            id: Date.now(), 
            name: {ar: "منتج جديد", en: "New Product"}, 
            description: {ar: "وصف المنتج الجديد.", en: "New product description."}, 
            price: "0 SAR", 
            imageUrl: "https://via.placeholder.com/400",
            category: { ar: "تصنيف جديد", en: "New Category" }
        };
        // FIX: Pass object to setConfig instead of functional update
        setConfig({ ...config, textContent: { ...config.textContent, store: { ...config.textContent.store, products: [...config.textContent.store.products, newProduct] } } });
    };

    const handleDeleteProduct = (id: number) => {
        const updatedProducts = config.textContent.store.products.filter(p => p.id !== id);
        // FIX: Pass object to setConfig instead of functional update
        setConfig({ ...config, textContent: { ...config.textContent, store: { ...config.textContent.store, products: updatedProducts } } });
    };

     const handleServiceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        // FIX: Use deep copy to prevent state mutation and pass object to setConfig
        const newConfig = JSON.parse(JSON.stringify(config));
        const serviceToUpdate = newConfig.textContent.booking.services[index];
        if (keys.length === 2) {
            (serviceToUpdate as any)[keys[0]][keys[1]] = value;
        }
        setConfig(newConfig);
    };


    const handleAddService = () => {
        const newService = { 
            id: Date.now(), 
            name: { ar: "خدمة جديدة", en: "New Service" }, 
            description: {ar: "وصف الخدمة.", en: "Service description."}, 
            duration: {ar: "0 دقيقة", en: "0 minutes"}
        };
        // FIX: Pass object to setConfig instead of functional update
        setConfig({ ...config, textContent: { ...config.textContent, booking: { ...config.textContent.booking, services: [...config.textContent.booking.services, newService] } } });
    };

    const handleDeleteService = (id: number) => {
        const updatedServices = config.textContent.booking.services.filter(s => s.id !== id);
        // FIX: Pass object to setConfig instead of functional update
        setConfig({ ...config, textContent: { ...config.textContent, booking: { ...config.textContent.booking, services: updatedServices } } });
    };

    const inputStyles: React.CSSProperties = {
        backgroundColor: 'var(--input-background-color)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-strong-color)',
    };
    
    const AccordionItem: React.FC<{id: string; title: string; children: React.ReactNode}> = ({id, title, children}) => {
        const isOpen = openAccordion === id;
        return (
            <div className="border rounded-lg" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                <button onClick={() => setOpenAccordion(isOpen ? null : id)} className="w-full flex justify-between items-center p-4 text-xl font-semibold">
                    <span style={{color: 'var(--text-strong-color)'}}>{title}</span>
                    <ChevronDownIcon isOpen={isOpen} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)'}}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
    
    const { admin } = config.textContent;
    const tabs = [
        { id: 'store', label: admin.tabStore[language], icon: <StoreIcon /> },
        { id: 'orders', label: admin.tabOrders[language], icon: <OrdersIcon /> },
        { id: 'content', label: admin.tabContent[language], icon: <ContentIcon /> },
        { id: 'appearance', label: admin.tabAppearance[language], icon: <AppearanceIcon /> },
        { id: 'booking', label: admin.tabBooking[language], icon: <BookingIcon /> },
        { id: 'payment', label: admin.tabPayment[language], icon: <PaymentIcon /> },
        { id: 'messages', label: admin.tabMessages[language], icon: (
            <div className="relative">
                <MessagesIcon />
                {unreadMessagesCount > 0 && (
                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {unreadMessagesCount}
                    </span>
                )}
            </div>
        ) },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'content': return (
                <div className="space-y-6">
                    <AccordionItem id="hero" title="القسم الرئيسي (Hero)">
                        <div className="space-y-4">
                            <label className="block"><span>العنوان الرئيسي (AR / EN)</span><LocalizedInput name="hero.title" value={config.textContent.hero.title} onChange={handleTextChange} /></label>
                            <label className="block"><span>النص الفرعي (AR / EN)</span><LocalizedInput type="textarea" rows={4} name="hero.subtitle" value={config.textContent.hero.subtitle} onChange={handleTextChange} /></label>
                        </div>
                    </AccordionItem>
                    <AccordionItem id="about" title="قسم من نحن">
                         <div className="space-y-4">
                            <label className="block"><span>العنوان (AR / EN)</span><LocalizedInput name="about.title" value={config.textContent.about.title} onChange={handleTextChange} /></label>
                            <label className="block"><span>الوصف (AR / EN)</span><LocalizedInput type="textarea" rows={4} name="about.description" value={config.textContent.about.description} onChange={handleTextChange} /></label>
                            <label className="block"><span>زر الحث على اتخاذ إجراء (أساسي) (AR / EN)</span><LocalizedInput name="about.primaryCta" value={config.textContent.about.primaryCta} onChange={handleTextChange} /></label>
                            <label className="block"><span>زر الحث على اتخاذ إجراء (ثانوي) (AR / EN)</span><LocalizedInput name="about.secondaryCta" value={config.textContent.about.secondaryCta} onChange={handleTextChange} /></label>
                        </div>
                    </AccordionItem>
                     <AccordionItem id="storeMeta" title="بيانات المتجر">
                        <div className="space-y-4">
                            <label className="block"><span>عنوان المتجر (AR / EN)</span><LocalizedInput name="store.title" value={config.textContent.store.title} onChange={handleTextChange} /></label>
                            <label className="block"><span>وصف المتجر (AR / EN)</span><LocalizedInput type="textarea" rows={3} name="store.description" value={config.textContent.store.description} onChange={handleTextChange} /></label>
                            <label className="block"><span>نص الحث على اتخاذ إجراء (AR / EN)</span><LocalizedInput name="store.cta" value={config.textContent.store.cta} onChange={handleTextChange} /></label>
                        </div>
                    </AccordionItem>
                </div>
            );
            case 'appearance': return (
                <div className="p-6 rounded-lg" style={{backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)'}}>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-strong-color)'}}>ألوان الموقع</h3>
                    <div className="space-y-4">
                        <label className="block"><span>اللون الأساسي</span><div className="flex items-center gap-2"><input type="color" name="primary" value={config.theme.primary} onChange={handleThemeChange} className="w-10 h-10 p-1 border-none cursor-pointer rounded" /><input type="text" name="primary" value={config.theme.primary} onChange={handleThemeChange} style={inputStyles} className="w-full mt-1 p-2 border rounded-md shadow-sm ring-primary"/></div></label>
                        <label className="block"><span>اللون الثانوي</span><div className="flex items-center gap-2"><input type="color" name="secondary" value={config.theme.secondary} onChange={handleThemeChange} className="w-10 h-10 p-1 border-none cursor-pointer rounded" /><input type="text" name="secondary" value={config.theme.secondary} onChange={handleThemeChange} style={inputStyles} className="w-full mt-1 p-2 border rounded-md shadow-sm ring-primary"/></div></label>
                    </div>
                </div>
            );
            case 'store': return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-strong-color)' }}>إدارة المنتجات</h3>
                        <button onClick={handleAddProduct} className="px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-md hover:opacity-90 transition-opacity">إضافة منتج</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {config.textContent.store.products.map((product, index) => (
                            <div key={product.id} className="p-4 border rounded-lg space-y-3 relative" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                                <button onClick={() => handleDeleteProduct(product.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-[var(--input-background-color)]"><TrashIcon /></button>
                                <label className="block"><span className="text-sm">اسم المنتج (AR / EN)</span><LocalizedInput name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} /></label>
                                <label className="block"><span className="text-sm">وصف المنتج (AR / EN)</span><LocalizedInput type="textarea" rows={2} name="description" value={product.description} onChange={(e) => handleProductChange(index, e)}/></label>
                                <label className="block"><span className="text-sm">الفئة (AR / EN)</span><LocalizedInput name="category" value={product.category} onChange={(e) => handleProductChange(index, e)}/></label>
                                <label className="block"><span className="text-sm">السعر</span><input type="text" name="price" value={product.price} onChange={(e) => handleProductChange(index, e)} style={inputStyles} className="mt-1 block w-full p-2 border rounded-md shadow-sm text-sm ring-primary"/></label>
                                <label className="block"><span className="text-sm">رابط الصورة</span><input type="text" name="imageUrl" value={product.imageUrl} onChange={(e) => handleProductChange(index, e)} style={inputStyles} className="mt-1 block w-full p-2 border rounded-md shadow-sm text-sm ring-primary"/></label>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'booking': return (
                 <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-strong-color)' }}>إدارة خدمات الحجز</h3>
                        <button onClick={handleAddService} className="px-4 py-2 bg-[var(--primary-color)] text-white font-semibold rounded-md hover:opacity-90 transition-opacity">إضافة خدمة</button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {config.textContent.booking.services.map((service, index) => (
                            <div key={service.id} className="p-4 border rounded-lg space-y-3 relative" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-background-color)'}}>
                                <button onClick={() => handleDeleteService(service.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-[var(--input-background-color)]"><TrashIcon /></button>
                                <label className="block"><span className="text-sm">اسم الخدمة (AR/EN)</span><LocalizedInput name="name" value={service.name} onChange={(e) => handleServiceChange(index, e)}/></label>
                                <label className="block"><span className="text-sm">وصف الخدمة (AR/EN)</span><LocalizedInput type="textarea" rows={2} name="description" value={service.description} onChange={(e) => handleServiceChange(index, e)}/></label>
                                <label className="block"><span className="text-sm">المدة (AR/EN)</span><LocalizedInput name="duration" value={service.duration} onChange={(e) => handleServiceChange(index, e)}/></label>
                            </div>
                        ))}
                    </div>
                </div>
            );
            case 'payment': return (
                <div className="p-6 rounded-lg" style={{backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)'}}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)'}}>إعدادات الدفع</h3>
                    <div className="space-y-6 max-w-md">
                        <div className="flex items-center justify-between p-4 rounded-lg" style={{backgroundColor: 'var(--background-color)'}}>
                            <span className="text-lg font-medium" style={{color: 'var(--text-strong-color)'}}>تفعيل تابي (Tabby)</span>
                            <ToggleSwitch name="tabbyEnabled" checked={config.paymentSettings.tabbyEnabled} onChange={handlePaymentSettingsChange} />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg" style={{backgroundColor: 'var(--background-color)'}}>
                            <span className="text-lg font-medium" style={{color: 'var(--text-strong-color)'}}>تفعيل تمارا (Tamara)</span>
                            <ToggleSwitch name="tamaraEnabled" checked={config.paymentSettings.tamaraEnabled} onChange={handlePaymentSettingsChange} />
                        </div>
                    </div>
                </div>
            );
            case 'messages': return (
                <div className="p-6 rounded-lg" style={{backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)'}}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)'}}>{admin.messagesTitle[language]}</h3>
                    {contactMessages.length > 0 ? (
                        <div className="space-y-4">
                            {contactMessages.map(msg => (
                                <div key={msg.id} className="p-4 border rounded-lg relative" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--background-color)'}}>
                                    <button onClick={() => deleteContactMessage(msg.id)} className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-[var(--input-background-color)]" aria-label="Delete message"><TrashIcon /></button>
                                    <div className="flex justify-between items-start mb-2 flex-wrap">
                                        <div className="flex-1 min-w-[200px]">
                                            <p className="font-semibold" style={{ color: 'var(--text-strong-color)' }}>{admin.messageFrom[language]}: {msg.name} (<a href={`mailto:${msg.email}`} className="text-[var(--primary-color)] hover:underline">{msg.email}</a>)</p>
                                            <p className="text-sm" style={{ color: 'var(--text-color)' }}>{admin.messageSubject[language]}: {msg.subject}</p>
                                        </div>
                                        <span className="text-xs text-right mt-2 sm:mt-0" style={{ color: 'var(--text-color)' }}>
                                            {new Date(msg.timestamp).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                    <p className="whitespace-pre-wrap pt-2 border-t" style={{ color: 'var(--text-color)', borderColor: 'var(--border-color)' }}>{msg.message}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-color)' }}>{admin.messagesEmpty[language]}</p>
                    )}
                </div>
            );
            case 'orders': return (
                 <div className="p-6 rounded-lg" style={{backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)'}}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)'}}>{admin.ordersTitle[language]}</h3>
                     {orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order: Order) => (
                                <div key={order.id} className="p-4 border rounded-lg" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--background-color)'}}>
                                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                                        <div>
                                            <p className="font-bold" style={{color: 'var(--text-strong-color)'}}>{config.textContent.profile.order[language]} {order.id}</p>
                                            <p className="text-sm" style={{color: 'var(--text-color)'}}>{order.customerName}</p>
                                        </div>
                                        <div className={`text-sm ${language === 'ar' ? 'text-left' : 'text-right'}`}>
                                            <p style={{color: 'var(--text-color)'}}>{new Date(order.orderDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                                            <p className="font-semibold" style={{color: 'var(--text-strong-color)'}}>{order.total.toFixed(2)} SAR</p>
                                        </div>
                                    </div>
                                    <div className="text-xs font-semibold inline-flex items-center px-2.5 py-0.5 rounded-full" style={{backgroundColor: 'var(--input-background-color)', color: 'var(--text-strong-color)'}}>
                                        {order.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-color)' }}>{admin.ordersEmpty[language]}</p>
                    )}
                </div>
            );
            default: return null;
        }
    };

    return (
        <section className="py-12 md:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4">
                <div className="text-center md:text-right mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: 'var(--text-strong-color)' }}>
                        لوحة التحكم
                    </h1>
                    <p className="mt-2 text-lg" style={{color: 'var(--text-color)'}}>إدارة محتوى ومظهر وتكوينات موقعك من هنا.</p>
                </div>

                <div className="grid md:grid-cols-12 gap-8">
                    <aside className="md:col-span-3 lg:col-span-2">
                        <nav className="flex flex-row md:flex-col gap-2 p-2 rounded-lg" style={{backgroundColor: 'var(--card-background-color)'}}>
                           {tabs.map(tab => (
                               <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-md text-lg font-semibold transition-colors duration-200 text-right ${activeTab === tab.id ? 'text-white' : 'hover:bg-[var(--input-background-color)]'}`}
                                style={{
                                    backgroundColor: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
                                    color: activeTab === tab.id ? 'white' : 'var(--text-strong-color)'
                                }}
                                >
                                   {tab.icon}
                                   <span>{tab.label}</span>
                               </button>
                           ))}
                        </nav>
                    </aside>

                    <div className="md:col-span-9 lg:col-span-10">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;
