import Price from 'components/price';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import Prose from 'components/prose';
import { getProduct, getProductRecommendations } from 'lib/bigcommerce';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes('noindex');
  const seoTitle = product.seo.title || product.title;
  const brandName = 'Tree Nursery Co';

  return {
    title: seoTitle.includes(brandName) ? { absolute: seoTitle } : seoTitle,
    description: product.seo.description || product.description,
    keywords: (product.seo as any).keywords || 'nursery, plants, trees',
    alternates: { canonical: `/${params.handle}` },
    robots: { index: indexable, follow: indexable },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.featuredImage?.url,
    "description": product.descriptionHtml ? product.descriptionHtml.replace(/<[^>]*>?/gm, '') : product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "price": product.priceRange.minVariantPrice.amount,
      "priceCurrency": product.priceRange.minVariantPrice.currencyCode,
      "availability": product.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://www.treenurseryco.com/${product.handle}`
    },
    "brand": { "@type": "Brand", "name": "Tree Nursery Co" }
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-screen-xl min-[2000px]:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <main className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          <section className="w-full lg:w-3/5">
            <Gallery images={product.images.map(img => ({ src: img.url, altText: img.altText }))} />
          </section>

          <section className="w-full lg:w-2/5">
            <ProductDescription product={product} />
          </section>
        </main>

        {product.descriptionHtml && (
          <section className="mt-12 lg:mt-20 w-full">
            <header className="mb-8">
              <h2 className="text-3xl font-black text-[#285e2c] mb-2 tracking-tighter capitalize">Product Details</h2>
              <div className="h-1.5 w-24 bg-[#3aae93]"></div>
            </header>
            <Prose
              className="prose prose-neutral prose-lg max-w-none 
                prose-headings:text-[#285e2c] prose-headings:font-black prose-headings:capitalize 
                prose-p:text-neutral-600 prose-strong:text-[#285e2c] prose-a:text-[#285e2c]"
              html={product.descriptionHtml}
            />
          </section>
        )}
      </div>

      <section className="w-full bg-[#fbfbfb] px-4 py-16 md:px-12 md:py-24 border-t border-neutral-100">
        <div className="max-w-screen-xl min-[2000px]:max-w-[1550px] mx-auto">
          <p className="text-2xl font-black mb-8 md:mb-12 tracking-tight text-[#285e2c] capitalize">Related Products</p>
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {relatedProducts.slice(0, 4).map((product) => (
        <div key={product.handle} className="bg-white border border-neutral-100 shadow-sm p-4 flex flex-col items-center">
          <Link href={`${product.handle}`} className="relative w-full aspect-square mb-6">
            <img
              src={product.featuredImage?.url}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </Link>
          <div className="flex-grow flex flex-col items-center w-full">
            <h3 className="text-base font-bold text-neutral-800 text-center mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
            <div className="text-[#285e2c] font-bold text-sm mb-4 text-center">
              <Price
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
            </div>
          </div>
          <Link
            href={`${product.handle}`}
            className="w-full text-white py-2 rounded-full text-center font-bold text-xs capitalize tracking-wider transition-opacity hover:opacity-90"
            style={{ backgroundImage: 'linear-gradient(to right, #4e6c25 0%, #254518 51%, #254518 100%)' }}
          >
            Buy now
          </Link>
        </div>
      ))}
    </div>
  );
}