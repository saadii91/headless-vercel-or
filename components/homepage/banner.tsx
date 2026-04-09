import Link from 'next/link';

export default function Banner() {
    return (
        <section
            className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(170deg, #1a3a2a 0%, #234d38 45%, #2d6148 100%)'
            }}
        >
            <div className="relative z-20 mx-auto px-6 max-w-7xl text-center flex flex-col items-center">

                <h1
                    className="text-5xl md:text-7xl font-medium tracking-tight mb-8 max-w-5xl text-white leading-[1.1]"
                    style={{ fontFamily: "'Lora', Georgia, serif" }}
                >
                    Your Garden <span className="text-[#a1c4b0] italic">Reimagined,</span><br />
                    with Tree Nursery Co
                </h1>

                <p className="text-lg md:text-xl text-[#a3d4b8] max-w-2xl leading-relaxed mb-12 font-light">
                    Get personalized plant recommendations and visualize your dream landscape backed by 65+ years of nursery expertise.
                </p>

                <Link
                    href="/search"
                    className="inline-block px-12 py-4 rounded-full bg-white text-[#1a3a2a] font-bold text-lg transition-all hover:scale-105 hover:bg-[#eff3ef] shadow-[0_15px_35px_rgba(0,0,0,0.4)] capitalize tracking-wide"
                >
                    Shop Now
                </Link>
            </div>
        </section>
    );
}