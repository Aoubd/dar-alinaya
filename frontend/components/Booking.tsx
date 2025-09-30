import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import TabbyLogo from './icons/TabbyLogo';
import TamaraLogo from './icons/TamaraLogo';

// Sample data for available times
const availableTimes = [
  "09:00 ص", "10:00 ص", "11:00 ص", "12:00 م",
  "02:00 م", "03:00 م", "04:00 م", "05:00 م"
];

// Icons
const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);


const Booking: React.FC = () => {
  const { config, language } = useContext(AppContext);
  const { booking } = config.textContent;
  const { paymentSettings } = config;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  
  const showPaymentOptions = paymentSettings.tabbyEnabled || paymentSettings.tamaraEnabled;


  const steps = [
    { number: 1, title: booking.step1Title[language] },
    { number: 2, title: booking.step2Title[language] },
    { number: 3, title: booking.step3Title[language] },
  ];

  const handleSelectService = (serviceId: number) => {
    setSelectedService(serviceId);
    setCurrentStep(2);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsBookingComplete(true);
  }
  
  const resetBooking = () => {
      setIsBookingComplete(false);
      setCurrentStep(1);
      setSelectedService(null);
      setSelectedTime(null);
  }

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
            {booking.title[language]}
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-color)' }}>
          {booking.description[language]}
        </p>

        <div className={`mt-16 border rounded-2xl shadow-lg p-8 ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ backgroundColor: 'var(--card-background-color)', borderColor: 'var(--border-color)' }}>
          {isBookingComplete ? (
            <div className="text-center py-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-strong-color)' }}>{booking.successTitle[language]}</h2>
                <p className="text-lg" style={{ color: 'var(--text-color)' }}>{booking.successBody[language]}</p>
                <div className={`p-6 rounded-lg border my-8 max-w-md mx-auto space-y-3 ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                    <p className="text-lg"><strong>{booking.serviceLabel[language]}:</strong> {booking.services.find(s => s.id === selectedService)?.name[language]}</p>
                    <p className="text-lg"><strong>{booking.dateLabel[language]}:</strong> {selectedDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-lg"><strong>{booking.timeLabel[language]}:</strong> {selectedTime}</p>
                </div>
                {showPaymentOptions && (
                    <div className="mt-4 mb-8">
                        <p className="font-semibold" style={{ color: 'var(--text-color)' }}>
                            {booking.availablePaymentMethods[language]}
                        </p>
                        <div className="flex items-center justify-center gap-6 mt-3">
                            {paymentSettings.tabbyEnabled && <TabbyLogo className="h-8 w-auto" />}
                            {paymentSettings.tamaraEnabled && <TamaraLogo className="h-8 w-auto" />}
                        </div>
                    </div>
                )}
                <button
                    onClick={resetBooking}
                    className="px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300"
                    style={{ '--tw-ring-offset-color': 'var(--card-background-color)' } as React.CSSProperties}
                >
                    {booking.newBookingBtn[language]}
                </button>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-12">
                <ol className="flex items-center w-full">
                  {steps.map((step, index) => (
                    <li key={step.number} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""}`} style={{'--after-border-color': 'var(--border-color)'} as React.CSSProperties}>
                      <span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${currentStep >= step.number ? 'bg-[var(--primary-color)] text-white' : ''}`}
                        style={ currentStep < step.number ? { backgroundColor: 'var(--input-background-color)', color: 'var(--text-color)' } : {}}
                      >
                        {currentStep > step.number ? <CheckIcon /> : step.number}
                      </span>
                    </li>
                  ))}
                </ol>
                 <ol className="flex items-center w-full mt-3 text-sm font-medium text-center">
                    {steps.map((step) => (
                        <li key={step.number} className={`w-full ${currentStep >= step.number ? 'text-[var(--primary-color)]' : 'text-gray-500'}`} style={currentStep < step.number ? { color: 'var(--text-color)' } : {}}>
                            {step.title}
                        </li>
                    ))}
                 </ol>
              </div>

              {/* Step Content */}
              <div>
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{booking.step1Title[language]}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {booking.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleSelectService(service.id)}
                          className={`p-6 border rounded-lg hover:border-[var(--primary-color)] hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 ring-primary ${language === 'ar' ? 'text-right' : 'text-left'}`}
                          style={{ borderColor: 'var(--border-color)' }}
                        >
                          <h3 className="text-lg font-bold" style={{ color: 'var(--text-strong-color)' }}>{service.name[language]}</h3>
                          <p className="text-sm mt-1" style={{ color: 'var(--text-color)' }}>{service.description[language]}</p>
                          <p className="text-sm font-semibold text-[var(--primary-color)] mt-3">{service.duration[language]}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Select Date & Time */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{booking.step2Title[language]}</h2>
                    <p className="mb-4 text-lg">{booking.dateLabel[language]}: {selectedDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {availableTimes.map(time => (
                            <button 
                                key={time}
                                onClick={() => handleSelectTime(time)}
                                className="p-4 border rounded-lg font-semibold text-center hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 ring-primary"
                                style={{ borderColor: 'var(--border-color)' }}
                            >
                                {time}
                            </button>
                        ))}
                     </div>
                    <button onClick={() => setCurrentStep(1)} className="mt-8 text-sm hover:underline" style={{ color: 'var(--text-color)' }}>{booking.backToServiceBtn[language]}</button>
                  </div>
                )}
                
                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-strong-color)' }}>{booking.step3Title[language]}</h2>
                        <div className={`p-6 rounded-lg border mb-6 space-y-2 ${language === 'ar' ? 'text-right' : 'text-left'}`} style={{ backgroundColor: 'var(--background-color)', borderColor: 'var(--border-color)' }}>
                            <p><strong>{booking.serviceLabel[language]}:</strong> {booking.services.find(s => s.id === selectedService)?.name[language]}</p>
                            <p><strong>{booking.dateLabel[language]}:</strong> {selectedDate.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                            <p><strong>{booking.timeLabel[language]}:</strong> {selectedTime}</p>
                        </div>
                         <form onSubmit={handleBookingSubmit} className="space-y-4 max-w-lg mx-auto">
                             <input type="text" placeholder={booking.namePlaceholder[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                             <input type="email" placeholder={booking.emailPlaceholder[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                             <input type="tel" placeholder={booking.phonePlaceholder[language]} required style={inputStyle} className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow" />
                             <div className="flex justify-between items-center pt-4">
                                <button onClick={() => setCurrentStep(2)} type="button" className="text-sm hover:underline" style={{ color: 'var(--text-color)' }}>{booking.backToTimeBtn[language]}</button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300"
                                    style={{ '--tw-ring-offset-color': 'var(--card-background-color)' } as React.CSSProperties}
                                >
                                    {booking.buttonText[language]}
                                </button>
                             </div>
                         </form>
                    </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;