'use client';

import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageIndex = parseInt(searchParams.get('image') || '0');

  return (
    <div className="relative h-[60vh] w-full lg:h-screen lg:sticky lg:top-0 bg-neutral-100">
      {images[imageIndex] && (
        <Image
          className="h-full w-full object-cover"
          fill
          src={images[imageIndex]?.src as string}
          alt={images[imageIndex]?.altText as string}
          priority
        />
      )}

      {/* Modern Minimal Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2 p-2 bg-white/20 backdrop-blur-md rounded-2xl">
          {images.map((image, index) => (
            <Link
              key={image.src}
              href={createUrl(pathname, new URLSearchParams({ image: index.toString() }))}
              scroll={false}
              className={`relative h-16 w-16 overflow-hidden rounded-xl transition-all duration-300 ${index === imageIndex ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'
                }`}
            >
              <img src={image.src} className="h-full w-full object-cover" alt="" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}