import Image from 'next/image';
import Link from 'next/link';

export function CollectionGrid({ collections }: { collections: any[] }) {
    if (!collections || collections.length === 0) return null;

    return (
        <section className="w-full px-2 py-4 md:py-8">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
                {collections.map((item, index) => (
                    <Link
                        key={item.handle}
                        href={`/${item.handle}`}
                        className="group block overflow-hidden rounded-lg bg-white transition-all duration-300"
                    >
                        <div className="relative overflow-hidden aspect-[4/3] w-full bg-gray-100 shadow-sm">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority={index < 4}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover"
                                quality={100}
                            />

                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 md:p-5">
                                <p className="text-[10px] font-bold uppercase tracking-wide text-white md:text-lg leading-tight">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}