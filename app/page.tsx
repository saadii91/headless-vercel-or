import { Carousel } from 'components/carousel';
import HomeCarousel from 'components/carousel-main';
import { CollectionGrid } from 'components/collection-grid'; // Import UI
import Footer from 'components/layout/footer';
import { HOME_COLLECTIONS, HOME_SLIDES } from 'lib/bigcommerce/constants'; // Import Data
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <HomeCarousel slides={HOME_SLIDES} />

      {/* New Collection Grid - Static & Instant */}
      <CollectionGrid collections={HOME_COLLECTIONS} />


      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}