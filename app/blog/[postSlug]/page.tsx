import BlogImage from 'components/blog/blog-image';
import { getBlogPostsRest } from 'lib/bigcommerce';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
    params
}: {
    params: Promise<{ postSlug: string }>
}): Promise<Metadata> {
    const { postSlug } = await params;
    const allPosts = await getBlogPostsRest();
    const post = allPosts.find((p: any) => p.slug === postSlug);

    if (!post) return { title: 'Post Not Found' };

    const description = post.meta_description || post.summary;

    return {
        title: post.meta_title || post.title,
        description: description,
        openGraph: {
            title: post.meta_title || post.title,
            description: description,
            images: post.imageSources?.[0] ? [{ url: post.imageSources[0] }] : []
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ postSlug: string }> }) {
    const { postSlug } = await params;
    const allPosts = await getBlogPostsRest();
    const post = allPosts.find((p: any) => p.slug === postSlug);

    if (!post) return notFound();

    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageSources?.[0],
        "datePublished": post.publishedDate,
        "author": {
            "@type": "Organization",
            "name": "Tree Nursery Co"
        },
        "publisher": {
            "@id": "https://www.treenurseryco.com/#organization"
        },
        "description": post.summary ? post.summary.replace(/<[^>]*>?/gm, '') : "",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.treenurseryco.com/blog/${post.slug}`
        }
    };

    return (
        <div className="bg-[#fcfdfc] w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />
            <section className="w-full bg-[#1b4332] min-h-[400px] flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 relative aspect-video md:aspect-auto bg-neutral-200">
                    <BlogImage sources={post.imageSources} alt={post.title} />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 text-white">
                    <span className="text-[#3aae93] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                        {new Date(post.publishedDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] uppercase tracking-tighter mb-6">
                        {post.title}
                    </h1>
                    <div className="h-1.5 w-24 bg-[#3aae93]"></div>
                </div>
            </section>

            <main className="w-full px-5 md:px-16 lg:px-24 py-12 md:py-20">
                <article className="w-full">
                    <div
                        className="prose prose-base md:prose-xl max-w-none 
                            prose-headings:text-[#1b4332] 
                            prose-headings:font-black 
                            prose-headings:uppercase 
                            prose-headings:tracking-tighter
                            prose-h2:text-2xl md:prose-h2:text-4xl
                            prose-h3:text-xl md:prose-h3:text-3xl
                            prose-p:text-neutral-600 
                            prose-p:leading-snug md:prose-p:leading-relaxed
                            prose-img:rounded-2xl md:prose-img:rounded-3xl 
                            prose-img:w-full
                            prose-a:text-[#3aae93] 
                            hover:prose-a:text-[#1b4332]"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </article>
            </main>
        </div>
    );
}