import React from 'react';

export const HeroSkeleton: React.FC = () => (
  <div className="py-24 md:py-32 text-center animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto"></div>
      <div className="mt-8 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
      <div className="mt-4 h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mx-auto"></div>
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="h-14 w-48 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        <div className="h-14 w-48 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

export const AboutUsSkeleton: React.FC = () => (
  <section className="py-24 md:py-32 text-center animate-pulse">
    <div className="max-w-4xl mx-auto">
      <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
      <div className="mt-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto"></div>
      <div className="mt-4 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mx-auto"></div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl p-8 space-y-4">
            <div className="h-7 w-1/3 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-600 rounded"></div>
        </div>
        <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl p-8 space-y-4">
            <div className="h-7 w-1/3 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded"></div>
            <div className="h-4 w-2/3 bg-slate-300 dark:bg-slate-600 rounded"></div>
        </div>
      </div>
      <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="h-14 w-52 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        <div className="h-14 w-52 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  </section>
);

const ProductCardSkeleton: React.FC = () => (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden flex flex-col bg-[var(--card-background-color)]">
        <div className="aspect-square w-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="mt-3 h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="mt-2 h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="mt-auto pt-4 flex justify-between items-center">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-10 bg-slate-300 dark:bg-slate-600 rounded-full w-28"></div>
            </div>
        </div>
    </div>
);

export const StoreSkeleton: React.FC = () => (
  <section className="py-24 md:py-32 animate-pulse">
    <div className="max-w-6xl mx-auto text-center">
      <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
      <div className="mt-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto"></div>
      <div className="mt-4 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mx-auto"></div>
      
      {/* Filter Skeleton */}
      <div className="mt-12 mb-8 p-4 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[var(--card-background-color)]">
          <div className='flex flex-col md:flex-row items-center gap-4 flex-wrap'>
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                  <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto md:flex-1 max-w-md">
              <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  </section>
);

export const BookingSkeleton: React.FC = () => (
    <section className="py-24 md:py-32 animate-pulse">
        <div className="max-w-4xl mx-auto text-center">
            <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
            <div className="mt-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto"></div>
            <div className="mt-4 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mx-auto"></div>
            <div className="mt-16 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-[var(--card-background-color)]">
                <div className="mb-12 flex justify-between items-center">
                    <div className="h-10 w-10 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    <div className="flex-grow h-1 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="flex-grow h-1 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-6"></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                </div>
            </div>
        </div>
    </section>
);

export const ContactUsSkeleton: React.FC = () => (
    <section className="py-24 md:py-32 animate-pulse">
        <div className="max-w-6xl mx-auto text-center">
            <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
            <div className="mt-8 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto"></div>
            <div className="mt-4 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3 mx-auto"></div>
            <div className="mt-16 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-[var(--card-background-color)]">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-12 space-y-6">
                        <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="flex justify-start md:justify-end">
                            <div className="h-14 w-40 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                    </div>
                    <div className="p-8 md:p-12 bg-slate-300 dark:bg-slate-600 space-y-8">
                        <div className="h-8 w-1/2 bg-slate-400 dark:bg-slate-500 rounded"></div>
                        <div className="h-12 bg-slate-400 dark:bg-slate-500 rounded-lg"></div>
                        <div className="h-8 bg-slate-400 dark:bg-slate-500 rounded-lg"></div>
                        <div className="h-8 bg-slate-400 dark:bg-slate-500 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export const AdminPanelSkeleton: React.FC = () => (
    <section className="py-12 md:py-16 animate-pulse">
        <div className="container mx-auto px-4">
            <div className="mb-10 space-y-4 md:text-right">
                <div className="h-12 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-lg md:ml-auto"></div>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg md:ml-auto"></div>
            </div>
            <div className="grid md:grid-cols-12 gap-8">
                <aside className="md:col-span-3 lg:col-span-2">
                    <div className="p-2 rounded-lg bg-[var(--card-background-color)] border border-slate-200 dark:border-slate-700 space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                        ))}
                    </div>
                </aside>
                <div className="md:col-span-9 lg:col-span-10">
                    <div className="space-y-6">
                        <div className="h-40 p-4 bg-[var(--card-background-color)] border border-slate-200 dark:border-slate-700 rounded-lg"></div>
                        <div className="h-40 p-4 bg-[var(--card-background-color)] border border-slate-200 dark:border-slate-700 rounded-lg"></div>
                        <div className="h-40 p-4 bg-[var(--card-background-color)] border border-slate-200 dark:border-slate-700 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export const ProductDetailSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-24 md:py-32 animate-pulse">
        <div className="max-w-6xl mx-auto">
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
                </div>
                <div className="space-y-6">
                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-10 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="space-y-3 pt-4">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="h-14 flex-grow bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const CheckoutSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-24 md:py-32 animate-pulse">
        <div className="max-w-4xl mx-auto text-center">
            <div className="h-14 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto"></div>
            <div className="mt-16 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 bg-[var(--card-background-color)]">
                <div className="mb-12 flex justify-between items-center">
                    {[...Array(3)].map((_, i) => (
                        <React.Fragment key={i}>
                            <div className={`h-10 w-10 ${i === 0 ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-700'} rounded-full`}></div>
                            {i < 2 && <div className="flex-grow h-1 bg-slate-200 dark:bg-slate-700"></div>}
                        </React.Fragment>
                    ))}
                </div>
                <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-8 mx-auto md:mx-0"></div>
                <div className="space-y-6">
                    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <div className="h-14 w-48 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const ProfileSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-24 md:py-32 animate-pulse">
         <div className="max-w-4xl mx-auto">
            <div className="h-12 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-8 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-lg mt-8 mb-6"></div>
            <div className="space-y-4">
                <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
         </div>
    </div>
);