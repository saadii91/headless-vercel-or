export const getCarouselQuery = /* GraphQL */ `
  query getCarousel {
    site {
      settings {
        homepage {
          carousel {
            slides {
              title: heading
              description: text
              buttonText
              buttonLink: link
              image {
                url(width: 2000)
              }
            }
          }
        }
      }
    }
  }
`;