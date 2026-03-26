export const dynamic = 'force-dynamic';

import HomeCarousel from 'components/carousel-main';
import { CollectionGrid } from 'components/collection-grid';
import FeaturedProducts from 'components/featured-products';
import BlogSection from 'components/home-blog-section';
import QuickLinks from 'components/home-quicl-links';
import { HOME_COLLECTIONS, HOME_SLIDES } from 'lib/bigcommerce/constants';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <>
      <HomeCarousel slides={HOME_SLIDES} />

      {/* New Collection Grid - Static & Instant */}
      <CollectionGrid collections={HOME_COLLECTIONS} />


      <Suspense>
        <FeaturedProducts productIds={[116, 114, 124, 127]} />
        <Suspense>
          <QuickLinks />
          <BlogSection />
        </Suspense>
      </Suspense>
    </>
  );
}