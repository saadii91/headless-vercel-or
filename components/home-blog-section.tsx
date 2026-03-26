import { getBlogPostsRest } from 'lib/bigcommerce';
import Link from 'next/link';
import BlogSlider from './blog-slider';

export default async function BlogSection() {
    // Calling your existing REST function
    const posts = await getBlogPostsRest();

    if (!posts || posts.length === 0) return null;

    return (
        <section className="w-full bg-white pt-12 md:pt-20 pb-24">
            <div className="mx-auto w-full px-5 md:px-16 lg:px-24">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span className="text-[#3aae93] font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">
                            Fresh from the garden
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#285e2c] leading-none">
                            Our Blog
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="group hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#285e2c] border-b-2 border-[#285e2c] pb-1"
                    >
                        See All Posts
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <BlogSlider posts={posts} />
            </div>
        </section>
    );
}