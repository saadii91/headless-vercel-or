'use client';

import { useEffect, useRef, useState } from 'react';

export default function CategoryDescription({
    html,
    title
}: {
    html: string;
    title: string;
}) {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const updateHeadings = () => {
            const elements = contentRef.current?.querySelectorAll('h2, h3');
            if (!elements || elements.length === 0) return;

            const foundHeadings = Array.from(elements).map((el, index) => {
                const text = el.textContent || '';
                const id = `section-${index}`;

                el.setAttribute('id', id);
                // Force the scroll margin via style to ensure it overrides everything
                (el as HTMLElement).style.scrollMarginTop = '120px';

                return { id, text };
            });

            setHeadings(foundHeadings);
        };

        // Watch for when the innerHTML actually loads
        const observer = new MutationObserver(updateHeadings);
        observer.observe(contentRef.current, { childList: true, subtree: true });

        // Initial check
        updateHeadings();

        return () => observer.disconnect();
    }, [html]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Use scrollTo with a manual offset for 100% reliability
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="my-16 rounded-[2.5rem] bg-neutral-50 p-8 lg:p-16 border border-neutral-100">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 text-left">

                {headings.length > 0 && (
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-6 w-1 rounded-full bg-[#285e2c]"></div>
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#285e2c]">
                                    On This Page
                                </span>
                            </div>
                            <nav className="flex flex-col space-y-4 border-l border-neutral-200 pl-4">
                                {headings.map((heading) => (
                                    <button
                                        key={heading.id}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className="text-left text-[13px] font-medium text-neutral-500 hover:text-[#285e2c] transition-colors duration-200"
                                    >
                                        {heading.text}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>
                )}

                <div className="flex-1">
                    <div className="mb-10 flex items-center gap-6">
                        <span className="text-sm font-bold uppercase tracking-[0.4em] text-[#285e2c] whitespace-nowrap">
                            About {title}
                        </span>
                        <div className="h-px flex-1 bg-neutral-200"></div>
                    </div>

                    <div
                        ref={contentRef}
                        className="prose prose-neutral prose-lg max-w-none 
            prose-headings:text-[#285e2c] prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-neutral-600 prose-p:leading-relaxed 
            prose-strong:text-[#285e2c] prose-strong:font-bold
            prose-a:text-[#285e2c] prose-a:font-semibold prose-a:underline underline-offset-4
            dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </div>
    );
}