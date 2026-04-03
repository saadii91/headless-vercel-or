'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BlogImage({
    sources = [],
    alt
}: {
    sources?: string[];
    alt: string;
}) {
    const [index, setIndex] = useState(0);
    const [failedAll, setFailedAll] = useState(false);

    if (!sources || sources.length === 0 || !sources[index] || failedAll) {
        return (
            <div className="flex items-center justify-center h-full bg-[#f0f4f1] text-[#285e2c]/30 font-bold italic text-xs uppercase tracking-widest px-4 text-center">
                Tree Nursery Co
            </div>
        );
    }

    const currentSrc = sources[index]!;

    return (
        <div className="relative w-full h-full overflow-hidden">
            <Image
                src={currentSrc}
                alt={alt}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => {
                    if (index < sources.length - 1) {
                        setIndex(index + 1);
                    } else {
                        setFailedAll(true);
                    }
                }}
            />
        </div>
    );
}