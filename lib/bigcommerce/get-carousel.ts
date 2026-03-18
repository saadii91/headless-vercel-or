import { bigCommerceFetch } from './index'; // Corrected capitalization
import { getCarouselQuery } from './queries/carousel-main';

export async function getCarousel() {
    const res = await bigCommerceFetch<any>({
        query: getCarouselQuery,
        cache: 'force-cache'
    });

    // Updated drill-down path to match the new schema
    return res.body.data?.site?.settings?.homepage?.carousel?.slides || [];
}