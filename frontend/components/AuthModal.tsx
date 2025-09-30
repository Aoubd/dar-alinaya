import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup } = useContext(AppContext);
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSwitchView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
    // Clear form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLoginView) {
        if(login(email, password)) {
            onClose(); // Close modal on successful login
        } else {
            throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }
      } else {
        if(signup(name, email, password)) {
            onClose(); // Close modal on successful signup
        } else {
            // Error is handled inside signup, but we can have a fallback
            throw new Error("حدث خطأ أثناء إنشاء الحساب.");
        }
      }
    } catch (err: any) {
        setError(err.message);
    }
  };
  
  const handleClose = () => {
      setError(null);
      setIsLoginView(true); // Reset to login view on close
      onClose();
  }

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--input-background-color)',
    borderColor: 'var(--border-color)',
    color: 'var(--text-strong-color)'
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in-up" onClick={handleClose}>
      <div className="rounded-2xl shadow-2xl w-full max-w-md p-8 m-4 transform transition-transform duration-300 ease-in-out" 
        onClick={e => e.stopPropagation()}
        style={{ backgroundColor: 'var(--card-background-color)'}}
      >
        <div className="relative text-center">
          <button onClick={handleClose} className="absolute top-0 right-0 p-2 rounded-full hover:bg-[var(--input-background-color)] text-3xl leading-none" style={{ color: 'var(--text-color)' }}>&times;</button>
          
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-strong-color)' }}>
            {isLoginView ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-color)' }}>
            {isLoginView ? 'أهلاً بعودتك! يرجى إدخال بياناتك.' : 'انضمي إلينا لتجربة جمال فريدة.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-right">
            {!isLoginView && (
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name" style={{ color: 'var(--text-color)' }}>الاسم</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow"
                  style={inputStyle}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email" style={{ color: 'var(--text-color)' }}>البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password" style={{ color: 'var(--text-color)' }}>كلمة المرور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 ring-primary transition-shadow"
                style={inputStyle}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full px-8 py-3.5 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-full shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-offset-2 transition-all transform hover:scale-105 duration-300"
              // FIX: Replaced non-standard 'focusRingOffsetColor' with '--tw-ring-offset-color' CSS variable for Tailwind compatibility.
              // FIX: Cast style object to `React.CSSProperties` to allow for custom CSS properties.
              style={{ '--tw-ring-offset-color': 'var(--card-background-color)' } as React.CSSProperties}
            >
              {isLoginView ? 'تسجيل الدخول' : 'إنشاء حساب'}
            </button>
          </form>

          <p className="mt-8 text-center" style={{ color: 'var(--text-color)' }}>
            {isLoginView ? 'ليس لديك حساب؟ ' : 'لديك حساب بالفعل؟ '}
            <button onClick={handleSwitchView} className="font-semibold hover:underline" style={{color: 'var(--primary-color)'}}>
              {isLoginView ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
