import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
    </svg>
);

const EmailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25-2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);


const ContactUs: React.FC = () => {
    const { config, language, addContactMessage } = useContext(AppContext);
    const { contact } = config.textContent;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const inputStyle: React.CSSProperties = {
        backgroundColor: 'var(--input-background-color)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-strong-color)'
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addContactMessage(formData);
        setIsSubmitted(true);
        // Optionally reset form after submission
        setFormData({ name: '', email: '', subject: '', message: '' });
    };


    return (
        <section className="py-24 md:py-32 animate-fade-in-up">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-strong-color)' }}>
                    <span className="text-gradient-primary-secondary bg-clip-text text-transparent">
                        {contact.title[language]}
                    </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-color)' }}>
                    {contact.description[language]}
                </p>

                <div className={`mt-16 border rounded-2xl shadow-lg overflow-hidden ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)' }}>
                    <div className="grid md:grid-cols-2">
                        {/* Form Section */}
                        <div className="p-8 md:p-12">
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <h3 className="text-2xl font-bold" style={{ color: 'var(--text-strong-color)' }}>{contact.successMessageTitle[language]}</h3>
                                    <p className="mt-2 text-lg" style={{ color: 'var(--text-color)' }}>{contact.successMessageBody[language]}</p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-6 font-semibold text-[var(--primary-color)] hover:underline">
                                        {language === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                                    </button>
                                </div>
                            ) : (
                                <>
                                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{contact.formTitle[language]}</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="sr-only">{contact.namePlaceholder[language]}</label>
                                            <input type="text" id="name" value={formData.name} onChange={handleInputChange} placeholder={contact.namePlaceholder[language]} style={inputStyle} required className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">{contact.emailPlaceholder[language]}</label>
                                            <input type="email" id="email" value={formData.email} onChange={handleInputChange} placeholder={contact.emailPlaceholder[language]} style={inputStyle} required className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="sr-only">{contact.subjectPlaceholder[language]}</label>
                                        <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} placeholder={contact.subjectPlaceholder[language]} style={inputStyle} required className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">{contact.messagePlaceholder[language]}</label>
                                        <textarea id="message" rows={5} value={formData.message} onChange={handleInputChange} placeholder={contact.messagePlaceholder[language]} style={inputStyle} required className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow"></textarea>
                                    </div>
                                    <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300"
                                            style={{ '--tw-ring-offset-color': 'var(--card-background-color)' } as React.CSSProperties}
                                        >
                                            {contact.buttonText[language]}
                                        </button>
                                    </div>
                                </form>
                                </>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="p-8 md:p-12" style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
                            <h2 className="text-2xl font-bold mb-6 text-white">{contact.infoTitle[language]}</h2>
                            <div className="space-y-6 text-lg">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 pt-1"><LocationIcon /></div>
                                    <p>{contact.address[language]}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0"><PhoneIcon /></div>
                                    <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0"><EmailIcon /></div>
                                    <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;