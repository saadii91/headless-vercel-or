'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
    ssr: false,
    loading: () => <div className="h-[40vh] w-full animate-pulse bg-gray-100 md:h-[56vh]" />,
});

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeCarousel({ slides }: { slides: any[] }) {
    if (!slides || slides.length === 0) return null;

    return (
        <section className="relative block w-full bg-gray-100 h-[40vh] md:h-[56vh]">
            <h1 className='invisible absolute'>Tree Nursery Co</h1>

            <style jsx global>{`
                .swiper-button-next, 
                .swiper-button-prev, 
                .swiper-pagination {
                    display: none !important;
                }

                @media (min-width: 768px) {
                    .swiper-button-next, 
                    .swiper-button-prev {
                        display: flex !important;
                        color: #ffffff !important;
                    }
                    .swiper-pagination {
                        display: block !important;
                    }
                    .swiper-pagination-bullet {
                        background: #ffffff !important;
                        opacity: 0.6;
                    }
                    .swiper-pagination-bullet-active {
                        background: #ffffff !important;
                        opacity: 1;
                    }
                }
            `}</style>

            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="h-full w-full">
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.image.url}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                sizes="100vw"
                                quality={100}
                            />

                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 text-center text-white p-4 md:p-12">
                                <div className="flex flex-col items-center justify-center w-[90%] md:w-[60%] mx-auto">
                                    <h2 className="text-3xl font-bold leading-tight md:text-6xl w-full">
                                        {slide.title}
                                    </h2>
                                    <p className="mt-3 text-base md:text-xl w-full opacity-90">
                                        {slide.description}
                                    </p>
                                    {slide.buttonLink && (
                                        <Link
                                            href={slide.buttonLink}
                                            className="mt-6 md:mt-8 rounded-full bg-[#285e2c] px-6 py-2.5 md:px-10 md:py-4 text-sm font-bold text-white transition-all hover:bg-opacity-90 active:scale-95"
                                        >
                                            {slide.buttonText || 'Shop Now'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}