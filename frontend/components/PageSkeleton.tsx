import React from 'react';
import { HeroSkeleton, AboutUsSkeleton, StoreSkeleton, BookingSkeleton, ContactUsSkeleton, AdminPanelSkeleton, ProductDetailSkeleton, CheckoutSkeleton, ProfileSkeleton } from './skeletons';

interface PageSkeletonProps {
    activeView: string;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ activeView }) => {
    
    if (activeView === 'admin') {
        return <AdminPanelSkeleton />;
    }
    
    if (activeView === 'productDetail') {
        return <ProductDetailSkeleton />;
    }

    if (activeView === 'checkout' || activeView === 'orderConfirmation') {
        return <CheckoutSkeleton />;
    }
    
    if (activeView === 'profile') {
        return <ProfileSkeleton />;
    }


    const renderPageSkeleton = () => {
        switch (activeView) {
            case 'home':
                return <HeroSkeleton />;
            case 'about':
                return <AboutUsSkeleton />;
            case 'store':
                return <StoreSkeleton />;
            case 'booking':
                return <BookingSkeleton />;
            case 'contact':
                return <ContactUsSkeleton />;
            default:
                return <HeroSkeleton />; // Default to home skeleton
        }
    };

    return (
        <div className="container mx-auto px-4">
            {renderPageSkeleton()}
        </div>
    );
};

export default PageSkeleton;