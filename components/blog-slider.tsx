'use client';

import { Calendar, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const getOrdinalDate = (dateStr: string) => {
    if (!dateStr) return 'Recent';
    const date = new Date(dateStr.replace(' ', 'T'));
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();

    const suffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    return `${month} ${day}${suffix(day)}, ${year}`;
};

export default function BlogSlider({ posts }: { posts: any[] }) {
    return (
        <div className="relative w-full group px-4 md:px-12">
            <button className="swiper-blog-prev absolute left-0 top-[35%] -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 hover:text-[#285e2c]">
                <span className="text-xl">←</span>
            </button>
            <button className="swiper-blog-next absolute right-0 top-[35%] -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 hover:text-[#285e2c]">
                <span className="text-xl">→</span>
            </button>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    nextEl: '.swiper-blog-next',
                    prevEl: '.swiper-blog-prev',
                }}
                autoplay={{ delay: 6000 }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    2000: { slidesPerView: 4 },
                }}
                className="!pb-2"
            >
                {posts.map((post, index) => {
                    const imageUrl = post.imageSources?.[0] || null;
                    const formattedDate = getOrdinalDate(post.publishedDate);
                    const displayAuthor = post.author || "Tammy Sons";

                    return (
                        <SwiperSlide key={post.id || index}>
                            <Link href={`/blog/${post.slug}`} className="flex flex-col group/card h-full pb-10">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-sm">
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt={post.title || ""}
                                            fill
                                            loading="lazy"
                                            className="object-cover transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 2000px) 33vw, 25vw"
                                            quality={100}
                                        />
                                    )}
                                </div>

                                <div className="relative -mt-12 mx-4 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-neutral-50 p-6 flex flex-col items-center text-center z-20">
                                    <p className="text-lg font-extrabold text-neutral-800 leading-tight mb-3 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                                        {post.title}
                                    </p>

                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-5">
                                        <div className="flex items-center gap-1.5">
                                            <User size={12} className="text-[#3aae93]" />
                                            {displayAuthor}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#3aae93]" />
                                            {formattedDate}
                                        </div>
                                    </div>

                                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed mb-6 min-h-[3.5rem]">
                                        {post.summary?.replace(/&nbsp;|<\/?[^>]+(>|$)/g, " ") || ""}
                                    </p>

                                    <span className="bg-[#285e2c] text-white text-[10px] font-black uppercase tracking-[0.2em] px-10 py-3 rounded-full transition-all group-hover/card:bg-[#1b4332] group-hover/card:shadow-lg group-hover/card:-translate-y-0.5">
                                        Read More
                                    </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}