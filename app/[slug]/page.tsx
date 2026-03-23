import { GridTileImage } from 'components/grid/tile';
import { bigCommerceFetch } from 'lib/bigcommerce';
import {
    bigCommerceToVercelCollection,
    bigCommerceToVercelProducts
} from 'lib/bigcommerce/mappers';
import { getCategoryQuery } from 'lib/bigcommerce/queries/category';
import { getProductsCollectionQuery } from 'lib/bigcommerce/queries/product';
import { getEntityIdByRouteQuery } from 'lib/bigcommerce/queries/route';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DynamicPage({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { cursor?: string; page?: string };
}) {
    const { slug } = params;
    const cursor = searchParams.cursor || null;
    const currentPage = Number(searchParams.page) || 1;

    const routeRes = await bigCommerceFetch<any>({
        query: getEntityIdByRouteQuery,
        variables: { path: `/${slug}` }
    });

    const node = routeRes.body.data.site.route.node;
    if (!node) return notFound();

    if (node.__typename === 'Category') {
        const entityId = node.entityId;

        const [categoryRes, productsRes] = await Promise.all([
            bigCommerceFetch<any>({
                query: getCategoryQuery,
                variables: { entityId }
            }),
            bigCommerceFetch<any>({
                query: getProductsCollectionQuery,
                variables: {
                    entityId,
                    first: 20,
                    after: cursor
                }
            })
        ]);

        const category = bigCommerceToVercelCollection(categoryRes.body.data.site.category);
        const productData = productsRes.body.data.site.category?.products;
        const products = bigCommerceToVercelProducts(productData?.edges?.map((e: any) => e.node) || []);

        const { hasNextPage, hasPreviousPage, startCursor, endCursor } = productData?.pageInfo || {};

        return (
            <div className="mx-auto max-w-screen-2xl px-4">
                <div className="flex flex-col border-b border-neutral-100 py-10">
                    <h1 className="text-5xl font-black tracking-tight text-[#285e2c]">
                        {category.title}
                    </h1>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 items-start gap-x-4 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product, index) => (
                        <div key={product.handle} className="w-full">
                            <Link href={`/${product.handle}`} className="block w-full">
                                <GridTileImage
                                    alt={product.title}
                                    label={{
                                        title: product.title,
                                        amount: product.priceRange.maxVariantPrice.amount,
                                        currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                                    }}
                                    src={product.featuredImage?.url}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    priority={index < 4}
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 py-12 border-t border-neutral-100">
                    {hasPreviousPage && (
                        <Link
                            href={`/${slug}${currentPage === 2 ? '' : `?cursor=${startCursor}&page=${currentPage - 1}`}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-[#285e2c] hover:bg-neutral-50"
                        >
                            ←
                        </Link>
                    )}

                    {currentPage > 1 && (
                        <Link
                            href={`/${slug}${currentPage === 2 ? '' : `?page=${currentPage - 1}`}`}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                        >
                            {currentPage - 1}
                        </Link>
                    )}

                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#285e2c] font-bold text-white shadow-md">
                        {currentPage}
                    </span>

                    {hasNextPage && (
                        <>
                            <Link
                                href={`/${slug}?cursor=${endCursor}&page=${currentPage + 1}`}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                            >
                                {currentPage + 1}
                            </Link>
                            <Link
                                href={`/${slug}?cursor=${endCursor}&page=${currentPage + 1}`}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-[#285e2c] hover:bg-neutral-50"
                            >
                                →
                            </Link>
                        </>
                    )}
                </div>

                {/* Full Width Professional Description (Pure HTML, No JS) */}
                {category.description && (
                    <div className="my-16 rounded-[2.5rem] bg-neutral-50 px-8 py-16 border border-neutral-100">
                        <div className="w-full">
                            <div className="mb-10 flex items-center gap-6">
                                <span className="text-sm font-bold uppercase tracking-[0.4em] text-[#285e2c] whitespace-nowrap">
                                    About {category.title}
                                </span>
                                <div className="h-px flex-1 bg-neutral-200"></div>
                            </div>

                            <div
                                className="prose prose-neutral prose-lg max-w-none 
                                prose-headings:text-[#285e2c] prose-headings:font-bold prose-headings:tracking-tight
                                prose-p:text-neutral-600 prose-p:leading-relaxed 
                                prose-strong:text-[#285e2c] prose-strong:font-bold
                                prose-a:text-[#285e2c] prose-a:font-semibold prose-a:underline underline-offset-4
                                dark:prose-invert"
                                dangerouslySetInnerHTML={{ __html: category.description }}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return notFound();
}