import Image from 'next/image';
import Link from 'next/link';

const LINKS_DATA = [
    {
        title: "Shop Plants for Your Zone",
        link: "/all",
        image: "https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/zone.jpg?t=1769041854"
    },
    {
        title: "FAQ'S",
        link: "/faq-tree-nursery-co",
        image: "https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/faqs.jpg?t=1769041851"
    },
    {
        title: "Youtube",
        link: "https://www.youtube.com/@tnnurseryco",
        image: "https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/shutterstock-2030519279-1-.jpg?t=1769899205"
    }
];

export default function QuickLinks() {
    return (
        <section className="w-full bg-white pt-12 md:pt-20 pb-[100px] px-4">
            <div className="mx-auto max-w-[1550px] grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {LINKS_DATA.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className="group relative flex flex-col aspect-[16/10] w-full overflow-hidden rounded-xl border-[6px] border-white shadow-md bg-white"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            loading="lazy"
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={100}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white leading-tight max-w-[220px]">
                                {item.title}
                            </h3>

                            <div className="mt-4 h-1 w-10 bg-white" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}