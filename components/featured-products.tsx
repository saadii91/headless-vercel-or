import { bigCommerceFetch } from 'lib/bigcommerce';
import { bigCommerceToVercelProducts } from 'lib/bigcommerce/mappers';
import { getStoreProductsQuery } from 'lib/bigcommerce/queries/product';
import { BigCommerceProductsOperation } from 'lib/bigcommerce/types';
import Image from 'next/image';
import Link from 'next/link';

async function getSpecificProducts(ids: number[]) {
    const res = await bigCommerceFetch<BigCommerceProductsOperation>({
        query: getStoreProductsQuery,
        variables: { entityIds: ids }
    });

    const productList = res.body.data.site.products.edges.map((edge) => edge.node);
    return bigCommerceToVercelProducts(productList);
}

export default async function FeaturedProducts({ productIds }: { productIds: number[] }) {
    const products = await getSpecificProducts(productIds);

    if (!products.length) return null;

    return (
        <section className="w-full bg-white border-y border-neutral-200">
            <div className="px-5 md:px-16 lg:px-24 pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-[#3aae93] font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">
                        Handpicked for you
                    </span>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#285e2c]">
                        Featured Products
                    </h3>
                </div>
            </div>


            <div className="grid grid-cols-2 lg:grid-cols-4 w-full border-t border-neutral-200">
                {products.map((product, index) => (
                    <Link
                        key={product.id}
                        href={`${product.handle}`}
                        className={`group relative flex flex-col bg-white p-4 md:p-8 transition-all hover:bg-neutral-50 
              /* Border logic: Add right border to odd items on mobile, or all but last on desktop */
              ${index % 2 === 0 ? 'border-r' : 'md:border-r'} 
              border-b border-neutral-200`}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-lg">
                            {product.featuredImage && (
                                <Image
                                    src={product.featuredImage.url}
                                    alt={product.featuredImage.altText}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            )}
                        </div>

                        <div className="mt-4 md:mt-8 flex flex-col items-center text-center">
                            <p className="text-sm md:text-lg font-black uppercase tracking-tight text-neutral-900 leading-tight group-hover:text-[#1b4332] transition-colors line-clamp-2">
                                {product.title}
                            </p>
                            <p className="mt-1 md:mt-2 text-lg md:text-xl font-medium text-[#1b4332]">
                                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                            </p>

                            <span className="hidden md:block mt-4 text-[10px] font-black uppercase tracking-widest text-[#3aae93] opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                                View Details
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}