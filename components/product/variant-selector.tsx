'use client';

import clsx from 'clsx';
import {
  VercelProductOption as ProductOption,
  VercelProductVariant as ProductVariant
} from 'lib/bigcommerce/types';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!options.length || (options.length === 1 && options[0]?.values.length === 1)) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  return options.map((option) => (
    <dl className="mb-6 md:mb-8" key={option.id}>
      <dt className="mb-3 md:mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
        {option.name}
      </dt>
      <dd className="flex flex-wrap gap-2 md:gap-4">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();
          const optionSearchParams = new URLSearchParams(searchParams.toString());
          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          const filtered = Array.from(optionSearchParams.entries()).filter(([key, val]) =>
            options.find(
              (opt) => opt.name.toLowerCase() === key && opt.values.includes(val)
            )
          );

          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, val]) => combination[key] === val && combination.availableForSale
            )
          );

          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              className={clsx(
                'relative flex min-w-[60px] md:min-w-[80px] items-center justify-center rounded-xl md:rounded-2xl border px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm font-bold transition-all duration-200 ease-in-out',
                {
                  'bg-[#285e2c] border-[#285e2c] text-white shadow-md scale-105 z-10': isActive,
                  'bg-white border-neutral-200 text-neutral-700 hover:border-[#285e2c] active:scale-95': !isActive && isAvailableForSale,
                  'opacity-40 cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-400 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-neutral-300 after:content-[""]': !isAvailableForSale,
                }
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}