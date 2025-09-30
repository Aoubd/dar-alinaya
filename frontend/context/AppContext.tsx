
import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of our data
interface LocalizedText {
  ar: string;
  en: string;
}
interface LocalizedProduct {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  price: string;
  imageUrl: string;
  category: LocalizedText;
}
interface LocalizedService {
  id: number;
  name: LocalizedText;
  description: LocalizedText;
  duration: LocalizedText;
}

interface Address {
    fullName: string;
    address: string;
    city: string;
    country: string;
}

export type UserRole = 'Admin' | 'Staff' | 'Member';
export type UserPermission = 'content' | 'appearance' | 'store' | 'booking' | 'payment' | 'messages' | 'orders' | 'users';

export interface User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: UserRole;
    permissions: { [key in UserPermission]?: boolean };
    address: Address;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface CartItem extends LocalizedProduct {
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface TrackingEvent {
    status: OrderStatus | 'Order Placed';
    description: LocalizedText;
    timestamp: string;
}

export interface Order {
  id: number;
  userId: number | null;
  customerName: string;
  items: CartItem[];
  total: number;
  shippingAddress: any;
  orderDate: string;
  status: OrderStatus;
  trackingHistory: TrackingEvent[];
}


interface Theme {
  primary: string;
  secondary: string;
  text: string;
  textStrong: string;
  background: string;
  cardBackground: string;
  inputBackground: string;
  border: string;
}

const lightTheme: Theme = {
  primary: '#2563eb', // blue-600
  secondary: '#06b6d4', // cyan-500
  text: '#475569', // slate-600
  textStrong: '#1e293b', // slate-800
  background: '#ffffff', // white
  cardBackground: '#f8fafc', // slate-50
  inputBackground: '#f1f5f9', // slate-100
  border: '#e2e8f0', // slate-200
};

const darkTheme: Theme = {
  primary: '#38bdf8', // sky-400
  secondary: '#2dd4bf', // teal-400
  text: '#94a3b8', // slate-400
  textStrong: '#e2e8f0', // slate-200
  background: '#0f172a', // slate-900
  cardBackground: '#1e293b', // slate-800
  inputBackground: '#334155', // slate-700
  border: '#334155', // slate-700
};


interface Config {
  textContent: {
    seo: {
        home: { title: LocalizedText, description: LocalizedText };
        about: { title: LocalizedText, description: LocalizedText };
        store: { title: LocalizedText, description: LocalizedText };
        booking: { title: LocalizedText, description: LocalizedText };
        contact: { title: LocalizedText, description: LocalizedText };
        checkout: { title: LocalizedText, description: LocalizedText };
        profile: { title: LocalizedText, description: LocalizedText };
    };
    nav: {
      home: LocalizedText;
      about: LocalizedText;
      store: LocalizedText;
      booking: LocalizedText;
      contact: LocalizedText;
    };
    auth: {
      login: LocalizedText;
      logout: LocalizedText;
      signup: LocalizedText;
      welcome: LocalizedText;
      adminPanel: LocalizedText;
      emailPlaceholder: LocalizedText;
      passwordPlaceholder: LocalizedText;
      namePlaceholder: LocalizedText;
      loginTitle: LocalizedText;
      loginSubtitle: LocalizedText;
      signupTitle: LocalizedText;
      signupSubtitle: LocalizedText;
      loginCta: LocalizedText;
      signupCta: LocalizedText;
      noAccount: LocalizedText;
      haveAccount: LocalizedText;
      errorInvalidCredentials: LocalizedText;
      errorEmailExists: LocalizedText;
      errorGeneral: LocalizedText;
    };
    hero: {
      title: LocalizedText;
      subtitle: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
    };
    about: {
      title: LocalizedText;
      description: LocalizedText;
      visionTitle: LocalizedText;
      visionText: LocalizedText;
      missionTitle: LocalizedText;
      missionText: LocalizedText;
      primaryCta: LocalizedText;
      secondaryCta: LocalizedText;
    };
    store: {
      title: LocalizedText;
      description: LocalizedText;
      products: LocalizedProduct[];
      cta: LocalizedText;
      addToCart: LocalizedText;
      addedToCart: LocalizedText;
      paymentOptionsText: LocalizedText;
      filterBy: LocalizedText;
      category: LocalizedText;
      allCategories: LocalizedText;
      price: LocalizedText;
      noProductsFound: LocalizedText;
      quantity: LocalizedText;
      backToStore: LocalizedText;
    };
    cart: {
      title: LocalizedText;
      emptyMessage: LocalizedText;
      subtotal: LocalizedText;
      checkout: LocalizedText;
      remove: LocalizedText;
    };
    contact: {
      title: LocalizedText;
      description: LocalizedText;
      formTitle: LocalizedText;
      namePlaceholder: LocalizedText;
      emailPlaceholder: LocalizedText;
      subjectPlaceholder: LocalizedText;
      messagePlaceholder: LocalizedText;
      buttonText: LocalizedText;
      infoTitle: LocalizedText;
      address: LocalizedText;
      phone: string;
      email: string;
      successMessageTitle: LocalizedText;
      successMessageBody: LocalizedText;
    };
    booking: {
      title: LocalizedText;
      description: LocalizedText;
      step1Title: LocalizedText;
      step2Title: LocalizedText;
      step3Title: LocalizedText;
      namePlaceholder: LocalizedText;
      emailPlaceholder: LocalizedText;
      phonePlaceholder: LocalizedText;
      buttonText: LocalizedText;
      services: LocalizedService[];
      successTitle: LocalizedText;
      successBody: LocalizedText;
      serviceLabel: LocalizedText;
      dateLabel: LocalizedText;
      timeLabel: LocalizedText;
      newBookingBtn: LocalizedText;
      backToServiceBtn: LocalizedText;
      backToTimeBtn: LocalizedText;
      availablePaymentMethods: LocalizedText;
    };
    checkout: {
      title: LocalizedText;
      stepShipping: LocalizedText;
      stepPayment: LocalizedText;
      stepSummary: LocalizedText;
      shippingTitle: LocalizedText;
      paymentTitle: LocalizedText;
      summaryTitle: LocalizedText;
      fullName: LocalizedText;
      address: LocalizedText;
      city: LocalizedText;
      country: LocalizedText;
      continueToPayment: LocalizedText;
      backToShipping: LocalizedText;
      continueToSummary: LocalizedText;
      cardNumber: LocalizedText;
      expiryDate: LocalizedText;
      cvc: LocalizedText;
      backToPayment: LocalizedText;
      placeOrder: LocalizedText;
      shippingTo: LocalizedText;
      orderSummary: LocalizedText;
      total: LocalizedText;
    };
    orderConfirmation: {
        title: LocalizedText;
        subtitle: LocalizedText;
        orderNumber: LocalizedText;
        continueShopping: LocalizedText;
    };
    profile: {
        title: LocalizedText;
        myOrders: LocalizedText;
        noOrders: LocalizedText;
        order: LocalizedText;
        date: LocalizedText;
        total: LocalizedText;
        status: LocalizedText;
        viewDetails: LocalizedText;
        hideDetails: LocalizedText;
        shippingAddress: LocalizedText;
        changePassword: LocalizedText;
        currentPassword: LocalizedText;
        newPassword: LocalizedText;
        confirmNewPassword: LocalizedText;
        saveChanges: LocalizedText;
        passwordUpdated: LocalizedText;
        addressUpdated: LocalizedText;
        passwordMismatch: LocalizedText;
        trackOrder: LocalizedText;
    };
    admin: {
        tabContent: LocalizedText;
        tabAppearance: LocalizedText;
        tabStore: LocalizedText;
        tabBooking: LocalizedText;
        tabPayment: LocalizedText;
        tabMessages: LocalizedText;
        tabOrders: LocalizedText;
        tabUsers: LocalizedText;
        messagesTitle: LocalizedText;
        messagesEmpty: LocalizedText;
        messageFrom: LocalizedText;
        messageDate: LocalizedText;
        messageSubject: LocalizedText;
        ordersTitle: LocalizedText;
        ordersEmpty: LocalizedText;
        usersTitle: LocalizedText;
        user: LocalizedText;
        role: LocalizedText;
        permissions: LocalizedText;
        roleAdmin: LocalizedText;
        roleStaff: LocalizedText;
        roleMember: LocalizedText;
        updateStatus: LocalizedText;
        statusPending: LocalizedText;
        statusProcessing: LocalizedText;
        statusShipped: LocalizedText;
        statusOutForDelivery: LocalizedText;
        statusDelivered: LocalizedText;
    };
  };
  theme: Theme;
  paymentSettings: {
    tabbyEnabled: boolean;
    tamaraEnabled: boolean;
  };
}

// Define the context type
interface AppContextType {
  config: Config;
  setConfig: (config: Config) => void;
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string) => boolean;
  updateUserPassword: (userId: number, oldPass: string, newPass: string) => boolean;
  updateUserAddress: (userId: number, address: Address) => void;
  updateUserRoleAndPermissions: (userId: number, role: UserRole, permissions: { [key in UserPermission]?: boolean }) => void;
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  contactMessages: ContactMessage[];
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => void;
  deleteContactMessage: (id: number) => void;
  markContactMessagesAsRead: () => void;
  cart: CartItem[];
  addToCart: (product: LocalizedProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (cart: CartItem[], shippingDetails: any, total: number) => Order;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

const simpleHash = (s: string) => 'hashed_' + s;

// --- DATABASE ---
// This object acts as our comprehensive, in-memory database.
const initialDatabase = {
    users: [
        {
            id: 1, name: "نورة عبدالله", email: "admin@example.com", password_hash: simpleHash("admin123"),
            role: 'Admin' as UserRole, permissions: {},
            address: { fullName: "نورة عبدالله", address: "123 شارع الملك فهد", city: "الرياض", country: "المملكة العربية السعودية" }
        },
        {
            id: 2, name: "فاطمة علي", email: "staff@example.com", password_hash: simpleHash("staff123"),
            role: 'Staff' as UserRole,
            permissions: { store: true, orders: true },
            address: { fullName: "فاطمة علي", address: "456 طريق الأمير محمد بن سلمان", city: "الرياض", country: "المملكة العربية السعودية" }
        },
        {
            id: 3, name: "سارة محمد", email: "member@example.com", password_hash: simpleHash("member123"),
            role: 'Member' as UserRole, permissions: {},
            address: { fullName: "سارة محمد", address: "789 شارع العليا", city: "الرياض", country: "المملكة العربية السعودية" }
        },
         {
            id: 4, name: "Mona Khaled", email: "mona@example.com", password_hash: simpleHash("mona123"),
            role: 'Member' as UserRole, permissions: {},
            address: { fullName: "Mona Khaled", address: "101 Jeddah Corniche", city: "Jeddah", country: "Saudi Arabia" }
        }
    ] as User[],
    orders: [] as Order[], // Will be populated below
    contactMessages: [
        { id: 1, name: "Aisha Ahmed", email: "aisha@example.com", subject: "Inquiry about Skincare services", message: "Hello, I would like to know more about your Royal Skincare package. What products do you use?", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), isRead: true },
        { id: 2, name: "خالد الفيصل", email: "khalid@example.com", subject: "مشكلة في الطلب رقم 1001", message: "مرحباً، لم يصلني طلب تأكيد الشحن للطلب رقم 1001 حتى الآن.", timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), isRead: false },
    ],
    config: {
        textContent: {
            seo: {
                home: {
                    title: { ar: "دار العناية | وجهتك الأولى للجمال الفاخر", en: "Dar Al-Inaya | Your Premier Beauty Destination" },
                    description: { ar: "اكتشفي سر الإطلالة المشرقة التي طالما حلمتِ بها. نجمع بين أحدث التقنيات العالمية واللمسات الفنية لخبرائنا لنصنع لكِ تجربة جمال فريدة.", en: "Discover the secret to the radiant look you've always dreamed of. We combine global technologies and expert artistry for a unique beauty experience." }
                },
                about: {
                    title: { ar: "من نحن | دار العناية", en: "About Us | Dar Al-Inaya" },
                    description: { ar: "تعرفي على رحلتنا نحو الجمال في دار العناية. رؤيتنا ورسالتنا هي إبراز جمالك الداخلي بأرقى أساليب العناية.", en: "Learn about our journey to beauty at Dar Al-Inaya. Our vision and mission is to highlight your inner beauty with the finest care." }
                },
                store: {
                    title: { ar: "المتجر | منتجات العناية الفاخرة", en: "Store | Luxury Care Products" },
                    description: { ar: "تصفحي مجموعتنا الحصرية من أفضل منتجات العناية بالبشرة والشعر ومستحضرات التجميل التي ينصح بها خبراؤنا.", en: "Browse our exclusive collection of the best skincare, haircare, and cosmetic products recommended by our experts." }
                },
                booking: {
                    title: { ar: "حجز موعد | دار العناية", en: "Book an Appointment | Dar Al-Inaya" },
                    description: { ar: "احجزي موعدك بسهولة للعناية الملكية بالبشرة، المانيكير والباديكير، وتسريحات الشعر والمكياج.", en: "Easily book your appointment for royal skincare, manicures, pedicures, and hair & makeup services." }
                },
                contact: {
                    title: { ar: "اتصل بنا | دار العناية", en: "Contact Us | Dar Al-Inaya" },
                    description: { ar: "هل لديك استفسار أو ترغبين في حجز موعد؟ فريقنا مستعد دائمًا لمساعدتك. تواصلي معنا اليوم.", en: "Have a question or want to book an appointment? Our team is always ready to help. Contact us today." }
                },
                checkout: {
                    title: { ar: "إتمام الشراء | دار العناية", en: "Checkout | Dar Al-Inaya" },
                    description: { ar: "أكملي طلبك بأمان وسهولة. خطوات قليلة تفصلك عن الحصول على منتجاتك المفضلة.", en: "Complete your order securely and easily. Just a few steps away from getting your favorite products." }
                },
                profile: {
                    title: { ar: "ملفي الشخصي | دار العناية", en: "My Profile | Dar Al-Inaya" },
                    description: { ar: "ادخلي إلى ملفك الشخصي لتتبع طلباتك وإدارة معلوماتك في دار العناية.", en: "Access your profile to track your orders and manage your information at Dar Al-Inaya." }
                }
            },
            nav: {
              home: { ar: "الرئيسية", en: "Home" },
              about: { ar: "من نحن", en: "About Us" },
              store: { ar: "المتجر", en: "Store" },
              booking: { ar: "حجز موعد", en: "Booking" },
              contact: { ar: "اتصل بنا", en: "Contact Us" },
            },
            auth: {
                login: { ar: "تسجيل الدخول", en: "Login" },
                logout: { ar: "تسجيل الخروج", en: "Logout" },
                signup: { ar: "إنشاء حساب", en: "Sign Up" },
                welcome: { ar: "أهلاً", en: "Welcome" },
                adminPanel: { ar: "لوحة التحكم", en: "Admin Panel" },
                emailPlaceholder: { ar: "البريد الإلكتروني", en: "Email" },
                passwordPlaceholder: { ar: "كلمة المرور", en: "Password" },
                namePlaceholder: { ar: "الاسم الكامل", en: "Full Name" },
                loginTitle: { ar: "تسجيل الدخول", en: "Login" },
                loginSubtitle: { ar: "أهلاً بعودتك! يرجى إدخال بياناتك.", en: "Welcome back! Please enter your details." },
                signupTitle: { ar: "إنشاء حساب جديد", en: "Create a New Account" },
                signupSubtitle: { ar: "انضمي إلينا لتجربة جمال فريدة.", en: "Join us for a unique beauty experience." },
                loginCta: { ar: "تسجيل الدخول", en: "Login" },
                signupCta: { ar: "إنشاء حساب", en: "Create Account" },
                noAccount: { ar: "ليس لديك حساب؟", en: "Don't have an account?" },
                haveAccount: { ar: "لديك حساب بالفعل؟", en: "Already have an account?" },
                errorInvalidCredentials: { ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة.", en: "Invalid email or password." },
                errorEmailExists: { ar: "هذا البريد الإلكتروني مسجل بالفعل.", en: "This email is already registered." },
                errorGeneral: { ar: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.", en: "An error occurred. Please try again." },
            },
            hero: {
              title: { ar: "وجهتك الأولى للجمال الفاخر", en: "Your First Destination for Luxury Beauty" },
              subtitle: { ar: "اكتشفي سر الإطلالة المشرقة التي طالما حلمتِ بها. نجمع بين أحدث التقنيات العالمية واللمسات الفنية لخبرائنا لنصنع لكِ تجربة جمال فريدة تعكس تألقك الداخلي.", en: "Discover the secret to the radiant look you've always dreamed of. We combine the latest global technologies and our experts' artistic touches to create a unique beauty experience that reflects your inner glow." },
              primaryCta: { ar: "حجز موعد", en: "Book an Appointment" },
              secondaryCta: { ar: "تصفح المتجر", en: "Browse the Store" },
            },
            about: {
              title: { ar: "رحلتنا نحو الجمال", en: "Our Journey to Beauty" },
              description: { ar: "في دار العناية، نؤمن بأن الجمال الحقيقي ينبع من الداخل، ومهمتنا هي إبرازه بأرقى أساليب العناية والاهتمام. تأسس مركزنا على شغف بالجمال ورغبة في تقديم تجربة استثنائية لكل سيدة تبحث عن التميز.", en: "At Dar Al-Inaya, we believe that true beauty comes from within, and our mission is to highlight it with the finest methods of care and attention. Our center was founded on a passion for beauty and a desire to provide an exceptional experience for every woman seeking excellence." },
              visionTitle: { ar: "رؤيتنا", en: "Our Vision" },
              visionText: { ar: "أن نكون الوجهة الرائدة والموثوقة في عالم الجمال والعناية، حيث نقدم خدمات تتجاوز توقعات عملائنا وتلهمهم لاكتشاف أفضل نسخة من أنفسهم.", en: "To be the leading and trusted destination in the world of beauty and care, where we offer services that exceed our clients' expectations and inspire them to discover the best version of themselves." },
              missionTitle: { ar: "رسالتنا", en: "Our Mission" },
              missionText: { ar: "تقديم تجارب جمال مخصصة وفريدة من خلال فريق من الخبراء المبدعين، وباستخدام أحدث التقنيات وأجود المنتجات العالمية، في بيئة مريحة وفاخرة.", en: "To provide personalized and unique beauty experiences through a team of creative experts, using the latest technologies and the finest international products, in a comfortable and luxurious environment." },
              primaryCta: { ar: "احجزي موعدك الآن", en: "Book Your Appointment Now" },
              secondaryCta: { ar: "اكتشفي منتجاتنا", en: "Discover Our Products" },
            },
            store: {
              title: { ar: "متجرنا الحصري", en: "Our Exclusive Store" },
              description: { ar: "اكتشفي مجموعتنا المختارة بعناية من أفضل منتجات العناية بالبشرة والشعر ومستحضرات التجميل العالمية التي ينصح بها خبراؤنا.", en: "Discover our carefully selected collection of the best skincare, haircare, and cosmetic products recommended by our experts." },
              addToCart: { ar: "أضف للسلة", en: "Add to Cart" },
              addedToCart: { ar: "تمت الإضافة", en: "Added" },
              paymentOptionsText: { ar: "أو قسمها على 4 دفعات مع:", en: "Or split into 4 payments with:" },
              filterBy: { ar: "تصفية حسب", en: "Filter by" },
              category: { ar: "الفئة", en: "Category" },
              allCategories: { ar: "الكل", en: "All" },
              price: { ar: "السعر", en: "Price" },
              noProductsFound: { ar: "لم يتم العثور على منتجات تطابق بحثك.", en: "No products match your search." },
              quantity: { ar: "الكمية", en: "Quantity" },
              backToStore: { ar: "العودة للمتجر", en: "Back to Store" },
              products: [
                { id: 1, name: {ar: "سيروم النضارة الفوري", en: "Instant Glow Serum"}, description: {ar: "غني بحمض الهيالورونيك وفيتامين C لترطيب عميق وإشراقة لا مثيل لها. يعزز مرونة البشرة ويقلل من ظهور الخطوط الدقيقة. مثالي للاستخدام اليومي.", en: "Rich in Hyaluronic Acid and Vitamin C for deep hydration and unmatched radiance. It enhances skin elasticity and reduces the appearance of fine lines. Perfect for daily use."}, price: "250", imageUrl: "https://images.unsplash.com/photo-1580856526398-b54d3728354c?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالبشرة", en: "Skincare" } },
                { id: 2, name: {ar: "كريم ليلي مجدد للخلايا", en: "Cell Renewing Night Cream"}, description: {ar: "يعمل أثناء نومك على تجديد خلايا البشرة ومحاربة علامات التقدم في السن. يحتوي على الريتينول والببتيدات لتحفيز إنتاج الكولاجين.", en: "Works while you sleep to renew skin cells and fight signs of aging. Contains Retinol and Peptides to stimulate collagen production."}, price: "320", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالبشرة", en: "Skincare" } },
                { id: 3, name: {ar: "زيت الأرغان المغربي للشعر", en: "Moroccan Argan Hair Oil"}, description: {ar: "يغذي الشعر من الجذور حتى الأطراف ويمنحه لمعاناً وقوة لا تقاوم. تركيبة خفيفة لا تترك أثراً دهنياً.", en: "Nourishes hair from roots to ends, giving it irresistible shine and strength. A lightweight formula that leaves no greasy residue."}, price: "180", imageUrl: "https://images.unsplash.com/photo-1605980997184-25a4a55e143b?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالشعر", en: "Haircare" } },
                { id: 4, name: {ar: "ماسك الفحم لتنقية المسام", en: "Charcoal Pore Purifying Mask"}, description: {ar: "يزيل الشوائب والزيوت الزائدة من البشرة ويمنحك ملمساً ناعماً ومظهراً صافياً. مناسب لجميع أنواع البشرة.", en: "Removes impurities and excess oils from the skin, leaving it smooth and clear. Suitable for all skin types."}, price: "150", imageUrl: "https://images.unsplash.com/photo-1598424294523-523d46a48b3b?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالبشرة", en: "Skincare" } },
                { id: 5, name: { ar: "كريم أساس بتغطية كاملة", en: "Full Coverage Foundation" }, description: { ar: "يوحد لون البشرة ويخفي العيوب لمظهر مثالي يدوم طويلاً. متوفر بعدة درجات ليناسب جميع ألوان البشرة.", en: "Evens skin tone and conceals imperfections for a long-lasting flawless look. Available in multiple shades to suit all skin tones." }, price: "190", imageUrl: "https://images.unsplash.com/photo-1590151025817-e42779427b5f?q=80&w=2000&auto=format&fit=crop", category: { ar: "مكياج", en: "Makeup" } },
                { id: 6, name: { ar: "شامبو لتقوية الشعر", en: "Strengthening Shampoo" }, description: { ar: "تركيبة غنية بالكيراتين والبيوتين لتقليل تساقط الشعر وتعزيز نموه الصحي والقوي.", en: "A formula rich in keratin and biotin to reduce hair loss and promote healthy, strong growth." }, price: "120", imageUrl: "https://images.unsplash.com/photo-1585750849332-b072236814c2?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالشعر", en: "Haircare" } },
                { id: 7, name: { ar: "واقي شمسي SPF 50+", en: "Sunscreen SPF 50+" }, description: { ar: "حماية عالية من أشعة الشمس UVA/UVB بتركيبة خفيفة غير دهنية وسريعة الامتصاص.", en: "High protection from UVA/UVB sun rays with a light, non-greasy, and fast-absorbing formula." }, price: "165", imageUrl: "https://images.unsplash.com/photo-1556912920-1b72e505a74e?q=80&w=2000&auto=format&fit=crop", category: { ar: "العناية بالبشرة", en: "Skincare" } },
                { id: 8, name: { ar: "أسطوانة اليشم للوجه", en: "Jade Facial Roller" }, description: { ar: "تساعد على تقليل الانتفاخ وتحسين الدورة الدموية لتعزيز امتصاص منتجات العناية بالبشرة.", en: "Helps reduce puffiness and improve blood circulation to enhance the absorption of skincare products." }, price: "95", imageUrl: "https://images.unsplash.com/photo-1598451634515-566c3a123e80?q=80&w=2000&auto=format&fit=crop", category: { ar: "أدوات", en: "Tools" } }
              ],
              cta: { ar: "هل لديكِ استفسار؟ تواصلي معنا", en: "Have a question? Contact us" },
            },
            cart: {
                title: { ar: "سلتي", en: "My Cart" },
                emptyMessage: { ar: "سلة التسوق فارغة.", en: "Your shopping cart is empty." },
                subtotal: { ar: "المجموع الفرعي", en: "Subtotal" },
                checkout: { ar: "إتمام الشراء", en: "Checkout" },
                remove: { ar: "إزالة", en: "Remove" },
            },
            contact: {
              title: { ar: "تواصل معنا", en: "Contact Us" },
              description: { ar: "هل لديك استفسار أو ترغبين في حجز موعد؟ فريقنا مستعد دائمًا لمساعدتك. تواصلي معنا عبر النموذج أدناه أو باستخدام معلومات الاتصال المباشرة.", en: "Have a question or want to book an appointment? Our team is always ready to help. Contact us using the form below or our direct contact information." },
              formTitle: { ar: "أرسل رسالة", en: "Send a Message" },
              namePlaceholder: { ar: "الاسم الكامل", en: "Full Name" },
              emailPlaceholder: { ar: "البريد الإلكتروني", en: "Email Address" },
              subjectPlaceholder: { ar: "الموضوع", en: "Subject" },
              messagePlaceholder: { ar: "رسالتك...", en: "Your message..." },
              buttonText: { ar: "إرسال الرسالة", en: "Send Message" },
              infoTitle: { ar: "معلومات التواصل", en: "Contact Information" },
              address: { ar: "123 شارع الجمال، حي الأناقة، الرياض، المملكة العربية السعودية", en: "123 Beauty St, Elegance District, Riyadh, KSA" },
              phone: "+966 11 123 4567",
              email: "contact@daralinaya.com",
              successMessageTitle: { ar: "شكراً لتواصلك!", en: "Thank you for contacting us!" },
              successMessageBody: { ar: "تم إرسال رسالتك بنجاح. سنتصل بك قريباً.", en: "Your message has been sent successfully. We will contact you soon." }
            },
            booking: {
              title: { ar: "احجزي موعدك الآن", en: "Book Your Appointment" },
              description: { ar: "اختاري الخدمة التي ترغبين بها والوقت المناسب لكِ، ودعينا نهتم بالباقي لنمنحك تجربة لا تُنسى.", en: "Choose your desired service and a convenient time, and let us take care of the rest to give you an unforgettable experience." },
              step1Title: { ar: "اختيار الخدمة", en: "Select Service" },
              step2Title: { ar: "اختيار الوقت", en: "Select Time" },
              step3Title: { ar: "تأكيد الحجز", en: "Confirm Booking" },
              namePlaceholder: { ar: "الاسم الكامل", en: "Full Name" },
              emailPlaceholder: { ar: "البريد الإلكتروني", en: "Email Address" },
              phonePlaceholder: { ar: "رقم الجوال", en: "Phone Number" },
              buttonText: { ar: "تأكيد الحجز", en: "Confirm Booking" },
              successTitle: { ar: "تم تأكيد حجزك بنجاح!", en: "Your booking is confirmed!" },
              successBody: { ar: "ستصلك رسالة تأكيد على بريدك الإلكتروني قريبًا.", en: "You will receive a confirmation email shortly." },
              serviceLabel: { ar: "الخدمة", en: "Service" },
              dateLabel: { ar: "التاريخ", en: "Date" },
              timeLabel: { ar: "الوقت", en: "Time" },
              newBookingBtn: { ar: "حجز موعد آخر", en: "New Booking" },
              backToServiceBtn: {ar: "العودة لاختيار الخدمة", en: "Back to Service Selection"},
              backToTimeBtn: {ar: "العودة لاختيار الوقت", en: "Back to Time Selection"},
              availablePaymentMethods: { ar: "طرق الدفع المتاحة:", en: "Available payment methods:" },
              services: [
                { id: 1, name: {ar: "عناية ملكية بالبشرة", en: "Royal Skincare"}, description: {ar: "جلسة تنظيف عميق وترطيب فاخر للبشرة.", en: "Deep cleansing session and luxurious skin hydration."}, duration: {ar: "60 دقيقة", en: "60 minutes"} },
                { id: 2, name: {ar: "مانيكير وباديكير كلاسيكي", en: "Classic Manicure & Pedicure"}, description: {ar: "عناية متكاملة لليدين والقدمين.", en: "Complete care for hands and feet."}, duration: {ar: "75 دقيقة", en: "75 minutes"} },
                { id: 3, name: {ar: "تسريحة شعر ومكياج سهرة", en: "Evening Hair & Makeup"}, description: {ar: "تألقي في مناسباتك مع خبراء التجميل لدينا.", en: "Shine at your events with our beauty experts."}, duration: {ar: "90 دقيقة", en: "90 minutes"} },
                { id: 4, name: {ar: "مساج استرخائي بالزيوت العطرية", en: "Relaxing Aromatherapy Massage"}, description: {ar: "جلسة مساج لراحة الجسم والعقل.", en: "A massage session to relax body and mind."}, duration: {ar: "50 دقيقة", en: "50 minutes"} },
              ]
            },
            checkout: {
              title: { ar: "إتمام الشراء", en: "Checkout" },
              stepShipping: { ar: "الشحن", en: "Shipping" },
              stepPayment: { ar: "الدفع", en: "Payment" },
              stepSummary: { ar: "المراجعة", en: "Summary" },
              shippingTitle: { ar: "عنوان الشحن", en: "Shipping Address" },
              paymentTitle: { ar: "معلومات الدفع", en: "Payment Information" },
              summaryTitle: { ar: "مراجعة الطلب", en: "Order Summary" },
              fullName: { ar: "الاسم الكامل", en: "Full Name" },
              address: { ar: "العنوان", en: "Address" },
              city: { ar: "المدينة", en: "City" },
              country: { ar: "الدولة", en: "Country" },
              continueToPayment: { ar: "متابعة إلى الدفع", en: "Continue to Payment" },
              backToShipping: { ar: "العودة إلى الشحن", en: "Back to Shipping" },
              continueToSummary: { ar: "متابعة للمراجعة", en: "Continue to Summary" },
              cardNumber: { ar: "رقم البطاقة", en: "Card Number" },
              expiryDate: { ar: "تاريخ الانتهاء (MM/YY)", en: "Expiry Date (MM/YY)" },
              cvc: { ar: "CVC", en: "CVC" },
              backToPayment: { ar: "العودة إلى الدفع", en: "Back to Payment" },
              placeOrder: { ar: "تأكيد الطلب", en: "Place Order" },
              shippingTo: { ar: "سيتم الشحن إلى:", en: "Shipping to:" },
              orderSummary: { ar: "ملخص الطلب", en: "Order Summary" },
              total: { ar: "المجموع الكلي", en: "Total" },
            },
            orderConfirmation: {
                title: { ar: "شكراً لطلبك!", en: "Thank you for your order!" },
                subtitle: { ar: "لقد استلمنا طلبك وسنبدا في تجهيزه في الحال. ستصلك رسالة تأكيد على بريدك الإلكتروني.", en: "We have received your order and will begin processing it immediately. You will receive a confirmation email shortly." },
                orderNumber: { ar: "رقم الطلب:", en: "Order Number:" },
                continueShopping: { ar: "متابعة التسوق", en: "Continue Shopping" },
            },
            profile: {
                title: { ar: "ملفي الشخصي", en: "My Profile" },
                myOrders: { ar: "طلباتي", en: "My Orders" },
                noOrders: { ar: "لم تقم بأي طلبات بعد.", en: "You have not placed any orders yet." },
                order: { ar: "طلب رقم", en: "Order #" },
                date: { ar: "التاريخ", en: "Date" },
                total: { ar: "المجموع", en: "Total" },
                status: { ar: "الحالة", en: "Status" },
                viewDetails: { ar: "عرض التفاصيل", en: "View Details" },
                hideDetails: { ar: "إخفاء التفاصيل", en: "Hide Details" },
                shippingAddress: { ar: "عنوان الشحن", en: "Shipping Address" },
                changePassword: { ar: "تغيير كلمة المرور", en: "Change Password" },
                currentPassword: { ar: "كلمة المرور الحالية", en: "Current Password" },
                newPassword: { ar: "كلمة المرور الجديدة", en: "New Password" },
                confirmNewPassword: { ar: "تأكيد كلمة المرور الجديدة", en: "Confirm New Password" },
                saveChanges: { ar: "حفظ التغييرات", en: "Save Changes" },
                passwordUpdated: { ar: "تم تحديث كلمة المرور بنجاح!", en: "Password updated successfully!"},
                addressUpdated: { ar: "تم تحديث العنوان بنجاح!", en: "Address updated successfully!"},
                passwordMismatch: { ar: "كلمتا المرور الجديدتان غير متطابقتين.", en: "New passwords do not match." },
                trackOrder: { ar: "تتبع الطلب", en: "Track Order" },
            },
            admin: {
                tabContent: { ar: "المحتوى", en: "Content" },
                tabAppearance: { ar: "المظهر", en: "Appearance" },
                tabStore: { ar: "المتجر", en: "Store" },
                tabBooking: { ar: "الحجوزات", en: "Bookings" },
                tabPayment: { ar: "الدفع", en: "Payment" },
                tabMessages: { ar: "الرسائل", en: "Messages" },
                tabOrders: { ar: "الطلبات", en: "Orders" },
                tabUsers: { ar: "المستخدمون", en: "Users" },
                messagesTitle: { ar: "الرسائل الواردة", en: "Incoming Messages" },
                messagesEmpty: { ar: "لا توجد رسائل لعرضها.", en: "No messages to display." },
                messageFrom: { ar: "من", en: "From" },
                messageDate: { ar: "التاريخ", en: "Date" },
                messageSubject: { ar: "الموضوع", en: "Subject" },
                ordersTitle: { ar: "جميع الطلبات", en: "All Orders" },
                ordersEmpty: { ar: "لا توجد طلبات لعرضها.", en: "No orders to display." },
                usersTitle: { ar: "إدارة المستخدمين", en: "User Management"},
                user: { ar: "المستخدم", en: "User"},
                role: { ar: "الدور", en: "Role"},
                permissions: { ar: "الصلاحيات", en: "Permissions"},
                roleAdmin: { ar: "مدير", en: "Admin" },
                roleStaff: { ar: "موظف", en: "Staff" },
                roleMember: { ar: "عضو", en: "Member" },
                updateStatus: { ar: "تحديث الحالة", en: "Update Status"},
                statusPending: { ar: "قيد المراجعة", en: "Pending"},
                statusProcessing: { ar: "قيد التجهيز", en: "Processing"},
                statusShipped: { ar: "تم الشحن", en: "Shipped"},
                statusOutForDelivery: { ar: "قيد التوصيل", en: "Out for Delivery"},
                statusDelivered: { ar: "تم التوصيل", en: "Delivered"},
            },
        },
        theme: lightTheme,
        paymentSettings: {
            tabbyEnabled: true,
            tamaraEnabled: true,
        }
    },
    language: 'ar' as 'ar' | 'en',
    themeMode: 'light' as 'light' | 'dark',
};


// Populate initial orders after products are defined
const productsForOrder = initialDatabase.config.textContent.store.products;
initialDatabase.orders = [
    {
        id: 1001, userId: 3, customerName: "سارة محمد",
        items: [
            { ...productsForOrder[0], quantity: 1 }, // Instant Glow Serum
            { ...productsForOrder[2], quantity: 1 }  // Moroccan Argan Hair Oil
        ],
        total: 430.00,
        shippingAddress: initialDatabase.users[2].address,
        orderDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'Shipped',
        trackingHistory: [
            { status: 'Order Placed', description: { ar: "تم استلام الطلب", en: "Order has been received" }, timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
            { status: 'Processing', description: { ar: "الطلب قيد التجهيز", en: "Order is being processed" }, timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
            { status: 'Shipped', description: { ar: "تم شحن الطلب", en: "Order has been shipped" }, timestamp: new Date(Date.now() - 86400000 * 3).toISOString() }
        ]
    },
    {
        id: 1002, userId: 4, customerName: "Mona Khaled",
        items: [ { ...productsForOrder[4], quantity: 2 } ], // Full Coverage Foundation
        total: 380.00,
        shippingAddress: initialDatabase.users[3].address,
        orderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'Delivered',
        trackingHistory: [
             { status: 'Order Placed', description: { ar: "تم استلام الطلب", en: "Order has been received" }, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
             { status: 'Processing', description: { ar: "الطلب قيد التجهيز", en: "Order is being processed" }, timestamp: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString() },
             { status: 'Shipped', description: { ar: "تم شحن الطلب", en: "Order has been shipped" }, timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
             { status: 'Out for Delivery', description: { ar: "الشحنة خرجت للتوصيل", en: "Shipment is out for delivery" }, timestamp: new Date(Date.now() - 3600000 * 4).toISOString() },
             { status: 'Delivered', description: { ar: "تم توصيل الشحنة بنجاح", en: "Shipment has been successfully delivered" }, timestamp: new Date(Date.now() - 3600000 * 1).toISOString() }
        ]
    }
];



// Create the context
export const AppContext = createContext<AppContextType>(null!);

// Create the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [database, setDatabase] = useState(initialDatabase);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    const isAuthenticated = !!currentUser;
    const { config, language, themeMode, users, contactMessages, orders } = database;

    const setConfig = (newConfig: Config) => {
        setDatabase(prev => ({ ...prev, config: newConfig }));
    };

    const toggleTheme = () => {
        setDatabase(prev => {
            const newThemeMode = prev.themeMode === 'light' ? 'dark' : 'light';
            return {
                ...prev,
                themeMode: newThemeMode,
                config: {
                    ...prev.config,
                    theme: newThemeMode === 'light' ? lightTheme : darkTheme
                }
            };
        });
    };
  
    const toggleLanguage = () => {
        setDatabase(prev => ({ ...prev, language: prev.language === 'ar' ? 'en' : 'ar' }));
    };

    const login = (email: string, password: string): boolean => {
        const user = database.users.find(u => u.email === email);
        if (user && user.password_hash === simpleHash(password)) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const signup = (name: string, email: string, password: string): boolean => {
        if (database.users.some(u => u.email === email)) {
            throw new Error("EMAIL_EXISTS");
        }
        const isFirstUser = database.users.length === 0;
        const newUser: User = {
            id: Date.now(),
            name,
            email,
            password_hash: simpleHash(password),
            role: isFirstUser ? 'Admin' : 'Member',
            permissions: {},
            address: { fullName: name, address: '', city: '', country: '' }
        };
        setDatabase(prev => ({ ...prev, users: [...prev.users, newUser] }));
        setCurrentUser(newUser);
        return true;
    };
  
    const updateUserPassword = (userId: number, oldPass: string, newPass: string): boolean => {
        const userIndex = database.users.findIndex(u => u.id === userId);
        if (userIndex === -1) throw new Error("User not found");
      
        const user = database.users[userIndex];
        if (user.password_hash !== simpleHash(oldPass)) {
            throw new Error("Incorrect current password.");
        }

        const updatedUsers = [...database.users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], password_hash: simpleHash(newPass) };
        setDatabase(prev => ({ ...prev, users: updatedUsers }));
      
        if (currentUser?.id === userId) {
            setCurrentUser(updatedUsers[userIndex]);
        }
        return true;
    };
  
    const updateUserAddress = (userId: number, address: Address) => {
        const userIndex = database.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;
      
        const updatedUsers = [...database.users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], address: address };
        setDatabase(prev => ({ ...prev, users: updatedUsers }));
      
        if (currentUser?.id === userId) {
            setCurrentUser(updatedUsers[userIndex]);
        }
    };
  
    const updateUserRoleAndPermissions = (userId: number, role: UserRole, permissions: { [key in UserPermission]?: boolean }) => {
        if (currentUser?.role !== 'Admin') return; 
      
        const userIndex = database.users.findIndex(u => u.id === userId);
        if (userIndex === -1) return;
      
        const updatedUsers = [...database.users];
        updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            role: role,
            permissions: role === 'Staff' ? permissions : {}
        };
        setDatabase(prev => ({ ...prev, users: updatedUsers }));
    };

    const addContactMessage = (message: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => {
        const newMessage: ContactMessage = {
            ...message,
            id: Date.now(),
            timestamp: new Date().toISOString(),
            isRead: false,
        };
        setDatabase(prev => ({ ...prev, contactMessages: [newMessage, ...prev.contactMessages] }));
    };

    const deleteContactMessage = (id: number) => {
        setDatabase(prev => ({ ...prev, contactMessages: prev.contactMessages.filter(msg => msg.id !== id) }));
    };

    const markContactMessagesAsRead = () => {
        setDatabase(prev => ({
            ...prev,
            contactMessages: prev.contactMessages.map(msg => ({ ...msg, isRead: true }))
        }));
    };

    const addToCart = (product: LocalizedProduct, quantity: number = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateCartItemQuantity = (productId: number, quantity: number) => {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
        });
    };
  
    const clearCart = () => setCart([]);

    const placeOrder = (cartItems: CartItem[], shippingDetails: any, total: number): Order => {
        const newOrder: Order = {
            id: Date.now(),
            userId: currentUser?.id || null,
            customerName: shippingDetails.fullName,
            items: cartItems,
            shippingAddress: shippingDetails,
            total: total,
            orderDate: new Date().toISOString(),
            status: 'Pending',
            trackingHistory: [{
                status: 'Order Placed',
                description: { ar: "تم استلام الطلب وجاري مراجعته.", en: "Order has been received and is being reviewed." },
                timestamp: new Date().toISOString()
            }]
        };
        setDatabase(prev => ({ ...prev, orders: [newOrder, ...prev.orders] }));
        clearCart();
        return newOrder;
    };
    
    const updateOrderStatus = (orderId: number, status: OrderStatus) => {
        const orderIndex = database.orders.findIndex(o => o.id === orderId);
        if (orderIndex === -1) return;

        const statusDescriptions: Record<OrderStatus, LocalizedText> = {
            'Pending': { ar: "الطلب قيد المراجعة", en: "Order is pending review" },
            'Processing': { ar: "الطلب قيد التجهيز", en: "Order is being processed" },
            'Shipped': { ar: "تم شحن الطلب", en: "Order has been shipped" },
            'Out for Delivery': { ar: "الشحنة خرجت للتوصيل", en: "Shipment is out for delivery" },
            'Delivered': { ar: "تم توصيل الشحنة بنجاح", en: "Shipment has been successfully delivered" }
        };

        const newTrackingEvent: TrackingEvent = {
            status,
            description: statusDescriptions[status],
            timestamp: new Date().toISOString()
        };

        const updatedOrders = [...database.orders];
        const updatedOrder = { ...updatedOrders[orderIndex] };
        updatedOrder.status = status;
        updatedOrder.trackingHistory = [...updatedOrder.trackingHistory, newTrackingEvent];
        updatedOrders[orderIndex] = updatedOrder;

        setDatabase(prev => ({ ...prev, orders: updatedOrders }));
    };

    return (
        <AppContext.Provider value={{ config, setConfig, isAuthenticated, currentUser, users, login, logout, signup, updateUserPassword, updateUserAddress, updateUserRoleAndPermissions, themeMode, toggleTheme, language, toggleLanguage, contactMessages, addContactMessage, deleteContactMessage, markContactMessagesAsRead, cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart, orders, placeOrder, updateOrderStatus }}>
            {children}
        </AppContext.Provider>
    );
};
