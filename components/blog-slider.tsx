'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function BlogSlider({ posts }: { posts: any[] }) {
    return (
        <div className="relative w-full group">
            {/* Navigation Arrows */}
            <button className="swiper-blog-prev absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-30 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#285e2c] opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-100">
                <span className="text-2xl">←</span>
            </button>
            <button className="swiper-blog-next absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 z-30 h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-xl text-[#285e2c] opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-100">
                <span className="text-2xl">→</span>
            </button>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: '.swiper-blog-next',
                    prevEl: '.swiper-blog-prev',
                }}
                autoplay={{ delay: 6000 }}
                spaceBetween={30}
                slidesPerView={1}
                // This ensures all slides stretch to match the tallest one
                autoHeight={false}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-12 !h-auto"
            >
                {posts.map((post, index) => {
                    const imageUrl = post.imageSources && post.imageSources.length > 0
                        ? post.imageSources[0]
                        : null;

                    const formattedDate = post.publishedDate
                        ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        : 'Recent';

                    return (
                        <SwiperSlide key={post.id || index} className="!h-auto">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="flex flex-col group/card h-full bg-white border border-transparent transition-all"
                            >
                                {/* 1. Fixed Aspect Ratio Image */}
                                <div className="relative aspect-[1.4] w-full overflow-hidden rounded-3xl bg-neutral-100 shrink-0">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={post.title || "Blog post"}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-500">
                                            <span className="text-xs font-bold uppercase">No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* 2. Text Content Area - Flex Grow makes this fill the space */}
                                <div className="mt-8 flex flex-col items-center text-center px-2 flex-grow">
                                    {/* Min-height on title prevents layout shift with short titles */}
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-900 leading-[1.1] min-h-[3.5rem] flex items-center justify-center">
                                        {post.title}
                                    </h3>

                                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3aae93]">
                                        <span>By Tammy Sons</span>
                                        <span className="h-1 w-1 rounded-full bg-[#3aae93]" />
                                        <span>{formattedDate}</span>
                                    </div>

                                    {/* Min-height on excerpt keeps the button position consistent */}
                                    <p className="mt-4 text-sm text-neutral-500 line-clamp-3 leading-relaxed min-h-[4.5rem]">
                                        {post.summary || ""}
                                    </p>

                                    {/* 3. Button - Pushed to the bottom by the flex-grow above */}
                                    <div className="mt-auto pt-8">
                                        <span className="inline-block rounded-full bg-[#285e2c] px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-all group-hover/card:bg-opacity-90 group-hover/card:shadow-lg">
                                            Read More
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}