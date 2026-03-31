import BlogImage from 'components/blog/blog-image';
import { GridTileImage } from 'components/grid/tile';
import { bigCommerceFetch, getBlogPostsRest, getPageContentRest } from 'lib/bigcommerce';
import {
    bigCommerceToVercelCollection,
    bigCommerceToVercelProducts
} from 'lib/bigcommerce/mappers';
import { getCategoryQuery } from 'lib/bigcommerce/queries/category';
import { getProductsCollectionQuery } from 'lib/bigcommerce/queries/product';
import { getEntityIdByRouteQuery } from 'lib/bigcommerce/queries/route';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const STATIC_PAGE_MAP: Record<string, number> = {
    'shipping-returns': 2,
    'contact-us': 4,
    'blog': 3,
    'gardening-blog': 3
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    const path = slug.startsWith('/') ? slug : `/${slug}`;

    if (slug === 'blog' || slug === 'gardening-blog') {
        return {
            title: 'Gardening Blog',
            description: 'Practical gardening tips, plant guides, and expert advice on trees, perennials, shrubs, and native plants. Learn how to grow healthier landscapes year-round.'
        };
    }

    const staticPageId = STATIC_PAGE_MAP[slug];
    if (staticPageId) {
        const pageData = await getPageContentRest(staticPageId);
        return {
            title: pageData?.meta_title || pageData?.name,
            description: pageData?.meta_description || ""
        };
    }

    try {
        const routeRes = await bigCommerceFetch<any>({ query: getEntityIdByRouteQuery, variables: { path } });
        const node = routeRes.body.data?.site?.route?.node;

        if (node?.__typename === 'Category') {
            const entityId = node.entityId;
            const categoryRes = await bigCommerceFetch<any>({ query: getCategoryQuery, variables: { entityId } });
            const seo = categoryRes?.body?.data?.site?.category?.seo;

            return {
                title: seo?.pageTitle || node.name,
                description: seo?.metaDescription || `Shop our selection of ${node.name} at Tree Nursery Co.`,
                keywords: seo?.metaKeywords
            };
        }
    } catch (e) {
        console.error("Metadata fetch error:", e);
        return { title: 'Tree Nursery Co' };
    }

    return { title: 'Tree Nursery Co' };
}

const PRODUCTS_PER_PAGE = 12;

export default async function DynamicPage({
    params,
    searchParams
}: {
    params: { slug: string };
    searchParams: { cursor?: string; page?: string };
}) {
    const { slug } = params;
    const path = slug.startsWith('/') ? slug : `/${slug}`;
    const cursor = searchParams.cursor || null;
    const currentPage = Number(searchParams.page) || 1;

    if (slug === 'blog' || slug === 'gardening-blog') {
        const posts = await getBlogPostsRest() || [];

        const blogSchema = {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Gardening Blog",
            "description": "Practical gardening tips, plant guides, and expert advice on trees, perennials, shrubs, and native plants.",
            "url": `https://www.treenurseryco.com/${slug}`,
            "publisher": {
                "@id": "https://www.treenurseryco.com/#organization"
            },
            "blogPost": posts.map((post: any) => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "url": `https://www.treenurseryco.com/blog/${post.slug}`,
                "datePublished": post.publishedDate,
                "description": post.summary?.replace(/<[^>]*>?/gm, '')
            }))
        };

        return (
            <div className="w-full px-6 py-20 bg-[#fcfdfc] lg:px-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
                />
                <header className="mb-16">
                    <h1 className="text-6xl font-black text-[#285e2c] mb-2 tracking-tighter uppercase">Gardening Blog</h1>
                    <div className="h-1.5 w-24 bg-[#3aae93]"></div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {posts.map((post: any) => (
                        <article key={post.id} className="flex flex-col group bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] overflow-hidden">
                                <BlogImage sources={post.imageSources} alt={post.title} />
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#3aae93] uppercase tracking-[0.2em] mb-3">
                                    {new Date(post.publishedDate).toLocaleDateString()}
                                </span>
                                <h2 className="text-xl font-extrabold mb-4 group-hover:text-[#3aae93] transition-colors">{post.title}</h2>
                                <p className="text-neutral-500 text-sm line-clamp-3 mb-8">{post.summary}</p>
                                <Link href={`/blog/${post.slug}`} className="mt-auto text-xs font-black uppercase tracking-widest text-[#285e2c] border-b-2 border-[#285e2c] w-fit">Read Full Story</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    const pageId = STATIC_PAGE_MAP[slug];
    if (pageId) {
        const pageData = await getPageContentRest(pageId);
        if (pageData) {
            const webPageSchema = {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": pageData.name,
                "description": pageData.meta_description || "",
                "publisher": {
                    "@id": "https://www.treenurseryco.com/#organization"
                }
            };

            return (
                <div className="mx-auto max-w-screen-xl px-4 py-24">
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
                    />
                    <h1 className="text-6xl font-black text-[#285e2c] mb-12 tracking-tighter">{pageData.name}</h1>
                    <div className="prose prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: pageData.body || '' }} />
                </div>
            );
        }
    }

    const routeRes = await bigCommerceFetch<any>({ query: getEntityIdByRouteQuery, variables: { path } });
    const node = routeRes.body.data?.site?.route?.node;

    if (node?.__typename === 'Category') {
        const entityId = node.entityId;
        const [categoryRes, productsRes] = await Promise.all([
            bigCommerceFetch<any>({ query: getCategoryQuery, variables: { entityId } }),
            bigCommerceFetch<any>({ query: getProductsCollectionQuery, variables: { entityId, first: PRODUCTS_PER_PAGE, after: cursor } })
        ]);

        const categoryData = categoryRes?.body?.data?.site?.category;
        const productsObj = productsRes?.body?.data?.site?.category?.products;

        const category = bigCommerceToVercelCollection(categoryData);
        const products = bigCommerceToVercelProducts(productsObj?.edges?.map((e: any) => e.node) || []);

        const hasNextPage = productsObj?.pageInfo?.hasNextPage;
        const endCursor = productsObj?.pageInfo?.endCursor;

        const categorySchema = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category.title,
            "url": `https://www.treenurseryco.com/${slug}`,
            "description": category.description ? category.description.replace(/<[^>]*>?/gm, '') : `Shop our ${category.title} collection.`,
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": products.map((product, index) => ({
                    "@type": "ListItem",
                    "position": index + 1,
                    "url": `https://www.treenurseryco.com/product/${product.handle}`
                }))
            }
        };

        return (
            <div className="w-full px-6 py-10 lg:px-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
                />
                <header className="mb-12">
                    <h1 className="text-6xl font-black text-[#285e2c] mb-4 tracking-tighter uppercase">{category.title}</h1>
                    <div className="h-1.5 w-24 bg-[#3aae93]"></div>
                </header>

                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 mb-16">
                    {products.map((product: any) => (
                        <Link key={product.handle} href={`${product.handle}`}>
                            <GridTileImage
                                alt={product.title}
                                label={{
                                    title: product.title,
                                    amount: product.priceRange.minVariantPrice.amount,
                                    maxAmount: product.priceRange.maxVariantPrice.amount,
                                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                                }}
                                src={product.featuredImage?.url}
                            />
                        </Link>
                    ))}
                </div>

                {(hasNextPage || currentPage > 1) && (
                    <div className="flex justify-center items-center gap-6 mb-24 border-b border-neutral-100 pb-16">
                        {currentPage > 1 && (
                            <Link
                                href={`/${slug}${currentPage === 2 ? '' : `?page=${currentPage - 1}`}`}
                                className="h-12 px-8 flex items-center justify-center rounded-full bg-neutral-100 text-[#285e2c] font-black hover:bg-[#3aae93] hover:text-white transition-all shadow-sm"
                            >
                                PREVIOUS
                            </Link>
                        )}

                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#285e2c] text-white shadow-xl font-black">
                            {currentPage}
                        </div>

                        {hasNextPage && (
                            <Link
                                href={`/${slug}?page=${currentPage + 1}&cursor=${endCursor}`}
                                className="h-12 px-8 flex items-center justify-center rounded-full bg-neutral-100 text-[#285e2c] font-black hover:bg-[#3aae93] hover:text-white transition-all shadow-sm"
                            >
                                NEXT
                            </Link>
                        )}
                    </div>
                )}

                {category.description && (
                    <section className="pt-10">
                        <div className="mb-12 flex items-center justify-center gap-8">
                            <div className="h-px flex-1 bg-neutral-200 hidden md:block"></div>
                            <span className="text-sm font-black uppercase tracking-[0.4em] text-[#285e2c] whitespace-nowrap text-center">
                                About {category.title}
                            </span>
                            <div className="h-px flex-1 bg-neutral-200 hidden md:block"></div>
                        </div>

                        <div
                            className="prose prose-neutral prose-lg max-w-none 
                                prose-headings:text-[#285e2c] prose-headings:font-black prose-headings:uppercase 
                                prose-p:text-neutral-600 prose-strong:text-[#285e2c] prose-a:text-[#285e2c]
                                text-center lg:text-left"
                            dangerouslySetInnerHTML={{ __html: category.description }}
                        />
                    </section>
                )}
            </div>
        );
    }

    return notFound();
}