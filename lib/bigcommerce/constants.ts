export const BIGCOMMERCE_API_URL = process.env.BIGCOMMERCE_API_URL ?? 'https://api.bigcommerce.com';
export const BIGCOMMERCE_CANONICAL_STORE_DOMAIN =
  process.env.BIGCOMMERCE_CANONICAL_STORE_DOMAIN ?? 'mybigcommerce.com';
export const BIGCOMMERCE_GRAPHQL_API_ENDPOINT = `${BIGCOMMERCE_CANONICAL_STORE_DOMAIN}/graphql`;


export const HOME_SLIDES = [
  {
    title: "Premium Indoor Plants",
    description: "Transform your living space with our curated collection of rare greenery.",
    buttonText: "Shop Collection",
    buttonLink: "/search/indoor-plants",
    image: {
      url: "https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/treenurseryco-perennials.jpg"
    }
  },
  {
    title: "Summer Garden Sale",
    description: "Save 30% on all outdoor perennials and garden tools this week.",
    buttonText: "View Offers",
    buttonLink: "/search/sale",
    image: {
      url: "https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/treenurseryco-shrubs.jpg"
    }
  },
  {
    title: "Summer Garden Sale",
    description: "Save 30% on all outdoor perennials and garden tools this week.",
    buttonText: "View Offers",
    buttonLink: "/search/sale",
    image: {
      url: "https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/treenurseryco-trees.jpg"
    }
  }
];