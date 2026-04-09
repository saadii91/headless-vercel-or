import Image from 'next/image';
import Link from 'next/link';

export function CollectionGrid({ collections }: { collections: any[] }) {
    if (!collections || collections.length === 0) return null;

    return (
        <section className="w-full px-4 py-8 md:py-12 bg-[#fcfdfc]">
            <div className="py-5 md:py-10">
                <h2 className="text-center text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#285e2c]">
                    Shop By Plant Category
                </h2>
            </div>
            <div className="mx-auto max-w-[1550px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {collections.map((item, index) => (
                    <Link
                        key={item.handle}
                        href={`/${item.handle}`}
                        className="group relative block overflow-hidden rounded-xl border-[6px] border-white shadow-md bg-white"
                    >
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                quality={100}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-center">
                                <p
                                    className="text-lg md:text-xl font-bold text-white drop-shadow-lg"
                                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                                >
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