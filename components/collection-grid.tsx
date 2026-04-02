import Image from 'next/image';
import Link from 'next/link';

export function CollectionGrid({ collections }: { collections: any[] }) {
    if (!collections || collections.length === 0) return null;

    return (
        <section className="w-full px-4 py-10 md:py-16 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-extrabold tracking-tight md:mb-12 md:text-5xl text-[#285e2c]">
                Explore Our Nursery
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-10">
                {collections.map((item, index) => (
                    <Link
                        key={item.handle}
                        href={`/${item.handle}`}
                        className="group block overflow-hidden rounded-xl bg-white transition-all duration-300"
                    >
                        <div className="relative overflow-hidden rounded-xl aspect-[1/1.2] w-full bg-gray-50 shadow-sm md:rounded-2xl md:aspect-[4/5]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                // Priority for the first 2 on mobile, first 4 on desktop
                                // since they are now visible on page load.
                                priority={index < 4}
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                // Quality 80 is perfect for grid thumbnails to keep LCP low
                                quality={80}
                            />
                        </div>

                        <div className="mt-3 flex flex-col items-center justify-center text-center md:mt-6">
                            <h3 className="text-lg font-bold text-gray-900 md:text-2xl">
                                {item.title}
                            </h3>
                            <div className="mt-1 h-0.5 w-6 bg-green-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-full md:mt-2 md:h-1 md:w-8" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}