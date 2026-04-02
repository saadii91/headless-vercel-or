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
        <section className="w-full bg-white pb-8">
            <div className="py-5 md:py-10">
                <h3 className="text-center text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#285e2c]">
                    Featured Products
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-4 lg:gap-2">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`${product.handle}`}
                        className="group relative flex flex-col bg-white p-1 transition-all hover:bg-neutral-50"
                    >
                        <div className="relative aspect-[4/3.5] w-full overflow-hidden rounded-md bg-neutral-100">
                            {product.featuredImage && (
                                <Image
                                    src={product.featuredImage.url}
                                    alt={product.featuredImage.altText}
                                    fill
                                    loading="lazy"
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={80}
                                />
                            )}
                        </div>

                        <div className="mt-3 flex flex-col items-center text-center px-1">
                            <p className="text-[11px] md:text-sm font-bold uppercase tracking-tight text-neutral-900 leading-tight group-hover:text-[#1b4332] transition-colors line-clamp-2">
                                {product.title}
                            </p>
                            <p className="mt-1 text-xs md:text-base font-semibold text-[#1b4332]">
                                ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}