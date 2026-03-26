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
        <section className="w-full bg-white pt-12 md:pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full border-t border-neutral-100">
                {LINKS_DATA.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className={`group relative flex flex-col aspect-[16/10] md:aspect-square lg:aspect-[16/10] w-full overflow-hidden bg-neutral-100 ${index !== LINKS_DATA.length - 1 ? 'md:border-r border-white' : ''
                            }`}
                    >
                        {/* Background Image */}
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />

                        {/* Dark Overlay for Text Visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-100" />

                        {/* Content Area */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-[0.85] max-w-[220px]">
                                {item.title}
                            </h3>

                            {/* ACCENT LINE: Now set to White (#ffffff) */}
                            <div className="mt-5 h-1.5 w-10 bg-white transition-all duration-500 ease-in-out group-hover:w-20" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}