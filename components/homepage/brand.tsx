import { ShieldCheck, Sprout, Truck } from 'lucide-react';

const BADGES = [
    {
        icon: Sprout,
        title: 'Grower Direct',
        sub: 'Save 80%',
    },
    {
        icon: ShieldCheck,
        title: 'Family-Owned',
        sub: 'Since 1959',
    },
    {
        icon: Truck,
        title: 'Fast Ship',
        sub: 'Nation-Wide',
    },
];

export default function TrustBadges() {
    return (
        <section className="hidden md:block w-full bg-[#fcfdfc] py-12 px-6 lg:px-12">
            <div className="max-w-[1550px] mx-auto grid grid-cols-1 md:grid-cols-3 border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                {BADGES.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                        <div
                            key={badge.title}
                            className={`flex flex-row items-center justify-center gap-6 p-8 md:p-12 ${index !== BADGES.length - 1 ? 'border-b md:border-b-0 md:border-r border-neutral-100' : ''
                                }`}
                        >
                            <div className="flex-shrink-0">
                                <Icon size={56} strokeWidth={1.2} className="text-[#1a3a2a]" />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-xl font-black text-neutral-900 leading-tight uppercase tracking-tight">
                                    {badge.title}
                                </p>
                                <p className="text-sm text-[#214935] font-bold uppercase tracking-widest">
                                    {badge.sub}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}