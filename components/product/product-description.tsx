'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { VercelProduct as Product } from 'lib/bigcommerce/types';
import { useSearchParams } from 'next/navigation';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();

  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => searchParams.get(option.name.toLowerCase()) === option.value
    )
  );

  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const showRange = !selectedVariant && minPrice !== maxPrice;

  return (
    <div className="w-full px-4 py-8 md:px-12 lg:px-20 bg-white">
      <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tighter text-neutral-900 leading-tight">
        {product.title}
      </h1>

      <div className="flex flex-col gap-2 mb-8 md:mb-10">
        <div className="text-3xl md:text-4xl font-light text-[#285e2c]">
          {selectedVariant ? (
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
            />
          ) : showRange ? (
            <div className="flex items-center gap-2">
              <Price amount={minPrice} currencyCode={currency} />
              <span className="text-neutral-400 text-xl md:text-2xl">—</span>
              <Price amount={maxPrice} currencyCode={currency} />
            </div>
          ) : (
            <Price amount={maxPrice} currencyCode={currency} />
          )}
        </div>
      </div>

      <div className="bg-neutral-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] mb-8 md:mb-12 border border-neutral-100 shadow-sm">
        <div className="mb-6 md:mb-8">
          <VariantSelector options={product.options} variants={product.variants} />
        </div>
        <div className="w-full">
          <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
        </div>
      </div>

      {product.descriptionHtml && (
        <section className="mt-8 md:mt-12">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-900">
              Product Details
            </p>
            <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <Prose
            className="text-base md:text-lg text-neutral-700 leading-relaxed font-light"
            html={product.descriptionHtml}
          />
        </section>
      )}
    </div>
  );
}