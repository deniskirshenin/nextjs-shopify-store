export type ShopifyExtension = {
    cost: {
        requestedQueryCost: number,
        actualQueryCost: number,
        throttleStatus: {
          maximumAvailable: number,
          currentlyAvailable: number,
          restoreRate: number
        }
    }
}

export type ShopifyProduct = {
    description: string;
    featuredImage: {
        id: string;
        url: string;
        altText: string;
        height: number;
        width: number;
    }
    handle: string;
    id: string;
    priceRangeV2: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        }
    }
    tags: string[];
    title: string;
}