'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { VercelProduct as Product } from 'lib/bigcommerce/types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => searchParams.get(option.name.toLowerCase()) === option.value
    )
  );

  const minPrice = product.priceRange.minVariantPrice.amount;
  const maxPrice = product.priceRange.maxVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const showRange = !selectedVariant && minPrice !== maxPrice;

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-[#285e2c] leading-tight capitalize">
        {product.title}
      </h1>

      <div className="flex flex-col gap-2 mb-6 md:mb-8">
        <div className="text-2xl md:text-3xl font-bold text-neutral-900">
          {selectedVariant ? (
            <Price
              amount={selectedVariant.price.amount}
              currencyCode={selectedVariant.price.currencyCode}
            />
          ) : showRange ? (
            <div className="flex items-center gap-2">
              <Price amount={minPrice} currencyCode={currency} />
              <span className="text-neutral-400 text-lg">—</span>
              <Price amount={maxPrice} currencyCode={currency} />
            </div>
          ) : (
            <Price amount={maxPrice} currencyCode={currency} />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl mb-8 border border-neutral-100 shadow-sm">
        <div className="mb-6">
          <VariantSelector options={product.options} variants={product.variants} />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-black uppercase tracking-widest text-[#285e2c] mb-3">
            Quantity
          </label>
          <div className="flex items-center w-32 h-12 border border-neutral-200 rounded-full overflow-hidden bg-neutral-50/50">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="flex-1 h-full flex items-center justify-center hover:bg-neutral-200 transition-colors text-lg font-bold text-[#285e2c]"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-10 text-center bg-transparent font-bold text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              className="flex-1 h-full flex items-center justify-center hover:bg-neutral-200 transition-colors text-lg font-bold text-[#285e2c]"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full">
          <AddToCart
            variants={product.variants}
            availableForSale={product.availableForSale}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
}