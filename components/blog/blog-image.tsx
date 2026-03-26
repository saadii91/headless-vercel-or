'use client';

import { useState } from 'react';

export default function BlogImage({
    sources = [], // Default to empty array to prevent undefined error
    alt
}: {
    sources?: string[];
    alt: string;
}) {
    const [index, setIndex] = useState(0);
    const [failedAll, setFailedAll] = useState(false);

    // Safety check: if sources is empty or undefined
    if (!sources || sources.length === 0 || failedAll) {
        return (
            <div className="flex items-center justify-center h-full bg-[#f0f4f1] text-[#285e2c]/30 font-bold italic text-xs uppercase tracking-widest px-4 text-center">
                TN Nursery
            </div>
        );
    }

    const currentSrc = sources[index];

    return (
        <img
            src={currentSrc}
            alt={alt}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => {
                if (index < sources.length - 1) {
                    setIndex(index + 1);
                } else {
                    setFailedAll(true);
                }
            }}
        />
    );
}