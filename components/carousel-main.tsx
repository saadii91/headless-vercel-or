'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

// 1. IMPORT SLIDE NORMALLY (Standard Import)
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

// 2. DYNAMIC IMPORT ONLY THE MAIN CONTAINER
const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
    ssr: false,
    loading: () => <div className="h-[50vh] w-full animate-pulse bg-gray-100 md:h-[70vh]" />,
});

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeCarousel({ slides }: { slides: any[] }) {
    if (!slides || slides.length === 0) return null;

    return (
        <section className="relative block w-full bg-gray-100 h-[50vh] md:h-[70vh]">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    // Swiper needs these to be direct children of the Swiper component
                    <SwiperSlide key={index} className="h-full w-full">
                        <div className="relative h-full w-full">
                            <Image
                                src={slide.image.url}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                sizes="100vw"
                                quality={90}
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 text-center text-white p-6">
                                <h2 className="text-4xl font-bold md:text-6xl">{slide.title}</h2>
                                <p className="mt-4 text-lg md:text-xl">{slide.description}</p>
                                {slide.buttonLink && (
                                    <Link
                                        href={slide.buttonLink}
                                        className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-bold text-black"
                                    >
                                        {slide.buttonText || 'Shop Now'}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}