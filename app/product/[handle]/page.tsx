import Price from 'components/price';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getProduct, getProductRecommendations } from 'lib/bigcommerce';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  return (
    <div className="bg-white">
      <main className="flex flex-col lg:flex-row items-stretch">
        <section className="w-full lg:w-1/2">
          <Gallery images={product.images.map(img => ({ src: img.url, altText: img.altText }))} />
        </section>

        <section className="w-full lg:w-1/2 flex items-start justify-center overflow-y-auto">
          <ProductDescription product={product} />
        </section>
      </main>

      <section className="w-full bg-[#fbfbfb] px-4 py-16 md:px-12 md:py-24 border-t border-neutral-100">
        <div className="max-w-[1800px] mx-auto">
          <p className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 tracking-tight">Related Products</p>
          <Suspense fallback={<div className="h-96 animate-pulse bg-neutral-200 rounded-3xl" />}>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);
  if (!relatedProducts.length) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-10">
      {relatedProducts.map((product) => (
        <Link key={product.handle} href={`/product/${product.handle}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl mb-4 md:mb-6 bg-neutral-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
            <img
              src={product.featuredImage?.url}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="space-y-1">
            <p className="text-base md:text-xl font-bold text-neutral-900 group-hover:text-[#285e2c] transition-colors leading-tight line-clamp-2">
              {product.title}
            </p>
            <div className="text-[#285e2c] font-semibold text-sm md:text-lg">
              <Price
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}