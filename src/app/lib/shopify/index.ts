import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guard";
import { Cart, Collection, Connection, Image, Menu, Page, Product, ShopifyAddToCartOperation, ShopifyCart, ShopifyCartOperation, ShopifyCollection, ShopifyCollectionOperation, ShopifyCollectionProductOperation, ShopifyCollectionsOperation, ShopifyCreateCartOperation, ShopifyMenuOperation, ShopifyPageOperation, ShopifyPagesOperation, ShopifyProduct, ShopifyProductOperation, ShopifyProductRecommendationsOperation, ShopifyProductsOperation, ShopifyRemoveFromCartOperation, ShopifyUpdateCartOperation } from "../types";
import { ensureStartsWith } from "../utils";
import { headers } from 'next/headers';
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getCollectionProductsQuery, getCollectionQuery, getCollectionsQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { getProductQuery, getProductRecommendationsQuery, getProductsQuery } from "./queries/product";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? ensureStartsWith(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, 'https://') : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function ShopifyFetch<T>({
    cache = 'force-cache',
    headers,
    query,
    tags,
    variables
} : {
    cache?: RequestCache,
    headers?: HeadersInit,
    query?: string,
    tags?: string[],
    variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': key,
              ...headers
            },
            body: JSON.stringify({
              ...(query && { query }),
              ...(variables && { variables })
            }),
            cache,
            ...(tags && { next: { tags } })
        });

        const body = await result.json();

        if(body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body
        };
    } catch (error) {
        if (isShopifyError(error)) {
            throw {
                cause: error.cause?.toString() || 'unknown',
                status: error.status || 500,
                message: error.message,
                query
            };
        }

        throw {
            error: error,
            query
        };
    }
};

const removeEdgesAndNodes = (array: Connection<any>) => {
    return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
    if (!cart.cost?.totalTaxAmount) {
        cart.cost.totalTaxAmount = {
            amount: '0.0',
            currencyCode: 'USD'
        };
    }

    return {
        ...cart,
        lines: removeEdgesAndNodes(cart.lines)
    };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
    if(!collection) {
        return undefined;
    }

    return {
        ...collection,
        path: `/collection/${collection.handle}`
    };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
    const reshapedCollections = [];

    for (const collection of collections) {
        if (collection) {
            const reshapedCollection = reshapeCollection(collection);

            if(reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }

    return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const fileName = image.url.match(/.*\/(.*)\..*/)[1];

        return {
            ...image,
            altText: image.altText || `${productTitle} - ${fileName}`
        };
    });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
    if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
      return undefined;
    }
  
    const { images, variants, ...rest } = product;
  
    return {
      ...rest,
      images: reshapeImages(images, product.title),
      variants: removeEdgesAndNodes(variants)
    };
  };

const reshapeProducts = (products: ShopifyProduct[]) => {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
    const response = await ShopifyFetch<ShopifyCreateCartOperation>({
        query: createCartMutation,
        cache: 'no-store'
    });

    return reshapeCart(response.body.data.cartCreate.cart);
};

export async function addToCart(
    cartId: string, 
    lines: { merchandiseId: string; quantity: number}[]
): Promise<Cart> {
    const response = await ShopifyFetch<ShopifyAddToCartOperation>({
        query: addToCartMutation,
        variables: {
            cartId,
            lines,
        },
        cache: 'no-store'
    });

    return reshapeCart(response.body.data.cartLinesAdd.cart);
};

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
    const response = await ShopifyFetch<ShopifyRemoveFromCartOperation>({
        query: removeFromCartMutation,
        variables: {
            cartId,
            lineIds,
        },
        cache: 'no-store'
    });

    return reshapeCart(response.body.data.cartLinesRemove.cart);
};

export async function updateCart(
    cartId: string,
    lines: { id: string, merchandiseId: string, quantity: number }[]
): Promise<Cart> {
    const response = await ShopifyFetch<ShopifyUpdateCartOperation>({
        query: editCartItemsMutation,
        variables: {
            cartId,
            lines
        },
        cache: 'no-store'
    });

    return reshapeCart(response.body.data.cartLinesUpdate.cart);
};

export async function getCart(cartId: string): Promise<Cart | undefined> {
    const response = await ShopifyFetch<ShopifyCartOperation>({
        query: getCartQuery,
        variables: { cartId },
        cache: 'no-store'
    });

    if(!response.body.data.cart) {
        return undefined;
    };

    return reshapeCart(response.body.data.cart);
};

export async function getCollection(handle: string): Promise<Collection | undefined> {
    const response = await ShopifyFetch<ShopifyCollectionOperation>({
        query: getCollectionQuery,
        tags: [TAGS.collections],
        variables: {
            handle
        }
    });

    return reshapeCollection(response.body.data.collection);
};

export async function getCollectionProducts({
    collection,
    reverse,
    sortKey
}: {
    collection: string,
    reverse?: boolean,
    sortKey?: string
}): Promise<Product[]> {
    const response = await ShopifyFetch<ShopifyCollectionProductOperation>({
        query: getCollectionProductsQuery,
        tags: [TAGS.collections, TAGS.products],
        variables: {
            handle: collection,
            reverse,
            sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
        }
    });
    if (!response.body.data.collection) {
        console.log(`No collection found for \`${collection}\``);
        return [];
    }
    
    return reshapeProducts(removeEdgesAndNodes(response.body.data.collection.products));
};

export async function getCollections(): Promise<Collection[]> {
    const response = await ShopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        tags: [TAGS.collections]
    });

    const shopifyCollections = removeEdgesAndNodes(response.body?.data?.collections);

    const collections = [
        {
            handle: '',
            title: 'All',
            description: 'All products',
            seo: {
                title: 'All',
                description: 'All products'
            },
            path: '/collection',
            updatedAt: new Date().toISOString(),
            image: {
                url: '',
                altText: '',
                height: 200,
                width: 300,
            }
        },
        ...reshapeCollections(shopifyCollections).filter(
            (collection) => !collection.handle.startsWith('hidden')
        )
    ];

    return collections;
};

export async function getMenu(handle: string): Promise<Menu[]> {
    const response = await ShopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle 
        }
    });

    return (
        response.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url.replace(domain, '').replace('/pages', '')
        })) || []
    );
};

export async function getPage(handle: string): Promise<Page> {
    const response = await ShopifyFetch<ShopifyPageOperation>({
        query: getPageQuery,
        variables: {
            handle
        }
    });

    return response.body.data.pageByHandle;
};

export async function getPages(): Promise<Page[]> {
    const response = await ShopifyFetch<ShopifyPagesOperation>({
        query: getPagesQuery,
    });

    return removeEdgesAndNodes(response.body.data.pages);
};

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await ShopifyFetch<ShopifyProductOperation>({
      query: getProductQuery,
      tags: [TAGS.products],
      variables: {
        handle
      }
    });
  
    return reshapeProduct(res.body.data.product, false);
  }

export async function getProductRecommendations(productId: string): Promise<Product[]> {
    const response = await ShopifyFetch<ShopifyProductRecommendationsOperation>({
        query: getProductRecommendationsQuery,
        tags: [TAGS.products],
        variables: {
            productId
        }
    });

    return reshapeProducts(response.body.data.productRecommendations);
};

export async function getProducts({
    query,
    reverse,
    sortKey
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const response = await ShopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey
        }
    });

    return reshapeProducts(removeEdgesAndNodes(response.body.data.products));
};

export async function revalidate(request: NextRequest): Promise<NextResponse> {
    const collectionWebHooks = ['collection/create', 'collection/delete', 'collection/update'];
    const productWebHooks = ['products/create', 'products/delete', 'products/update'];
    const topic = headers().get('x-shopify-topic') || 'unknown';
    const secret = request.nextUrl.searchParams.get('secret');
    const isCollectionUpdate = collectionWebHooks.includes(topic);
    const isProductUpdate = productWebHooks.includes(topic);

    if(!secret || secret !== process.env.ADMIN_API_ACCESS_TOKEN) {
        console.error('Invalid revalidation secret');
        return NextResponse.json({ status: 200 });
    };

    if(!isCollectionUpdate || !isProductUpdate) {
        return NextResponse.json({ status: 200 });
    };

    if(isCollectionUpdate) {
        revalidateTag(TAGS.collections);
    };

    if(isProductUpdate) {
        revalidateTag(TAGS.products);
    };

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
