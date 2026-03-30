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


export const HOME_COLLECTIONS = [
  {
    title: 'Trees',
    handle: 'trees',
    image: 'https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/trees-collection-new.jpg'
  },
  {
    title: 'Shrubs',
    handle: 'shrubs',
    image: 'https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/shrubs-collection.jpg'
  },
  {
    title: 'Perennials',
    handle: 'perennials',
    image: 'https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/perennials-collection.jpg'
  },

  {
    title: 'Ferns',
    handle: 'ferns',
    image: 'https://cdn11.bigcommerce.com/s-kss309bppi/images/stencil/original/image-manager/ferns-collection-2-.jpg'
  },
  {
    title: 'Live Stakes',
    handle: 'live-stakes',
    image: 'https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/livetakes-collection.jpg?t=1769041165'
  },
  {
    title: 'Moss',
    handle: 'moss',
    image: 'https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/moss-collection.jpg?t=1769041167'
  },
  {
    title: 'Tree Seedlings',
    handle: 'seedlings',
    image: 'https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/seedling-collection.jpg?t=1769041170'
  },
  {
    title: 'Vines',
    handle: 'groundcover',
    image: 'https://cdn11.bigcommerce.com/s-9nn6ejxj73/images/stencil/original/image-manager/vines-collection.jpg?t=1769041176'
  }
];