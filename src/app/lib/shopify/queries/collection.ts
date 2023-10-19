import productFragment from "../fragments/product";
import seoFragment from "../fragments/seo";
import imageFragment from "../fragments/image";

const collectionFragment = /* GraphQL */`
    fragment collection on Collection {
        handle
        title
        description
        seo {
        ...seo
        }
        updatedAt
        image {
            ...image
        }
    }
    ${seoFragment}
    ${imageFragment}
`;

export const getCollectionQuery = /* GraphQL */`
    query getCollection($handle: String!) {
        collection(handle: $handle) {
            ...collection
        }
    }
    ${collectionFragment}
`;

export const getCollectionsQuery = /* GraphQL */`
    query getCollections {
        collections(first: 100) {
            edges {
                node {
                    ...collection
                }
            }
        }
    }
    ${collectionFragment}
`;

export const getCollectionProductsQuery = /* GraphQL */`
    query getCollectionProducts($handle: String!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
        collection(handle: $handle) {
            products(sortKey: $sortKey, reverse: $reverse, first: 100) {
                edges {
                    node {
                        ...product
                    }
                }
            }
        }
    }
    ${productFragment}
`;