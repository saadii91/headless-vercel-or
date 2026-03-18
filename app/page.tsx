import { Carousel } from 'components/carousel';
import HomeCarousel from 'components/carousel-main';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { HOME_SLIDES } from 'lib/bigcommerce/constants';
import { Suspense } from 'react';

export const runtime = 'edge';

export default function HomePage() {
  return (
    <>
      {/* 100/100 SPEED: No API calls, priority images load immediately */}
      <HomeCarousel slides={HOME_SLIDES} />

      <ThreeItemGrid />

      <Suspense>
        {/* The bottom product carousel still uses the standard BC fetch */}
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}