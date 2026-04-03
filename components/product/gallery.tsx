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
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square md:aspect-[1/1.1] max-h-[630px] w-full overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-100">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-cover"
            fill
            src={images[imageIndex]?.src as string}
            alt={images[imageIndex]?.altText as string}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <Link
              key={image.src}
              href={createUrl(pathname, new URLSearchParams({ image: index.toString() }))}
              scroll={false}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all ${index === imageIndex ? 'ring-2 ring-[#3aae93]' : 'opacity-60 hover:opacity-100'
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