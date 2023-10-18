export type Maybe<T> = T | null;

export type Connection<T> = {
    edges: Array<Edge<T>>;
};

export type Edge<T> = {
    node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
    lines: CartItem[];
};

export type CartItem = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: Money;
    };
    merchandise: {
        id: string;
        title: string;
        selectedOptions: {
            name: string;
            value: string;
        }[];
        products: Product;
    };
};

export type Collection = ShopifyCollection & {
    path: string;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type Menu = {
    title: string;
    path: string;
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type Page = {
    id: string;
    title: string;
    handle: string;
    body: string;
    seo?: SEO;
    bodySummary: string;
    createdAt: string;
    updatedAt: string;
};

export type Article = {
    id: string;
    title: string;
    content: string;
    image?: Image;
    seo?: SEO;
    authorV2: {
        name: string;
    }
    publishedAt: string;
    tags: string[];
    handle: string;
    excerpt: string;
    excerptHtml: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
    variants: ProductVariant[];
    images: Image[];
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type SEO = {
    title: string;
    description: string;
};

export type ShopifyCart = {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money;
    };
    lines: Connection<CartItem>;
    totalQuantity: number;
};

export type ShopifyCollection = {
    handle: string;
    title: string;
    description: string;
    seo: SEO;
    updatedAt: string;
    image: Image;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    availableForSale: Boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type ShopifyCartOperation = {
    data: {
        cart: ShopifyCart;
    };
    variables: {
        cartId: string;
    };
};

export type ShopifyCreateCartOperation = {
    data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
    data: {
        cartLinesAdd: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyRemoveFromCartOperation = {
    data: {
        cartLinesRemove: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lineIds: string[];
    };
};

export type ShopifyUpdateCartOperation = {
    data: {
        cartLinesUpdate: {
            cart: ShopifyCart;
        };
    };
    variables: {
        cartId: string;
        lines: {
            id: string;
            merchandiseId: string;
            quantity: number;
        }[];
    };
};

export type ShopifyCollectionOperation = {
    data: {
        collection: ShopifyCollection;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyCollectionProductOperation = {
    data: {
        collection: {
            products: Connection<ShopifyProduct>;
        };
    };
    variables: {
        handle: string;
        reverse?: boolean;
        sortKey?: string;
    };
};

export type ShopifyCollectionsOperation = {
    data: {
        collections: Connection<ShopifyCollection>;
    };
};

export type ShopifyMenuOperation = {
    data: {
        menu?: {
            items: {
                title: string;
                url: string;
            }[];
        };
    };
    variables: {
        handle: string;
    };
};

export type ShopifyArticleOperation = {
    data: {
        blog: {
            articleByHandle: Article;
        }
    };
    variables: { handle: string};
}

export type ShopifyArticlesOperation = {
    data: {
        blog: {
            articles: Connection<Article>;
        }
    }
}

export type ShopifyPageOperation = {
    data: { pageByHandle: Page };
    variables: { handle: string };
};

export type ShopifyPagesOperation = {
    data: {
        pages: Connection<Page>;
    };
};

export type ShopifyProductOperation = {
    data: {
        product: ShopifyProduct;
    };
    variables: {
        handle: string;
    };
};

export type ShopifyProductRecommendationsOperation = {
    data: {
        productRecommendations: ShopifyProduct[];
    };
    variables: {
        productId: string;
    };
};

export type ShopifyProductsOperation = {
    data: {
        products: Connection<ShopifyProduct>;
    };
    variables: {
        query?: string;
        reverse?: boolean;
        sortKey?: string; 
    };
};