export const dynamic = 'force-dynamic';

import { CollectionGrid } from 'components/collection-grid';
import FeaturedProducts from 'components/featured-products';
import QuickLinks from 'components/home-quicl-links';
import Banner from 'components/homepage/banner';
import TrustBadges from 'components/homepage/brand';
import { HOME_COLLECTIONS } from 'lib/bigcommerce/constants';
import { Suspense } from 'react';

export default async function HomePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.treenurseryco.com/#organization",
        "name": "Tree Nursery Co",
        "url": "https://www.treenurseryco.com",
        "logo": "https://www.treenurseryco.com/logo.png",
        "description": "Premium nursery offering high-quality trees, perennials, and shrubs. Expert gardening advice and landscaping supplies.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12845 State Route 108",
          "addressLocality": "Altamont",
          "addressRegion": "TN",
          "postalCode": "37301",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-931-692-7325",
          "contactType": "customer service",
          "email": "sales@treenurseryco.com"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.treenurseryco.com/#website",
        "url": "https://www.treenurseryco.com",
        "name": "Tree Nursery Co",
        "publisher": {
          "@id": "https://www.treenurseryco.com/#organization"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Banner />
      <TrustBadges />
      <CollectionGrid collections={HOME_COLLECTIONS} />
      <Suspense>
        <FeaturedProducts productIds={[116, 114, 124, 127]} />
        <Suspense>
          <QuickLinks />
        </Suspense>
      </Suspense>
    </>
  );
}