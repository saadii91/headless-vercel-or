import { getBlogPostsRest } from 'lib/bigcommerce';
import Link from 'next/link';
import BlogSlider from './blog-slider';

export default async function BlogSection() {
    const posts = await getBlogPostsRest();

    if (!posts || posts.length === 0) return null;

    return (
        <section className="w-full bg-[#fcfcfc] py-12 md:py-20">
            <div className="mx-auto w-full px-2">
                <div className="flex flex-col items-center text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#285e2c]">
                        Our Blog
                    </h3>
                    <p className="text-sm text-neutral-500 mt-2">A few of our recent posts</p>
                </div>

                <BlogSlider posts={posts} />

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/blog"
                        className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#555] border-b border-[#555] pb-1 transition-colors hover:text-[#285e2c] hover:border-[#285e2c]"
                    >
                        See More Posts
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}