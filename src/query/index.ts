import { gql } from "@/utils/gql";

export const productsQuery = gql`
    query ProductsQuery {
        products(first: 6) {
            nodes {
                description
                featuredImage {
                    id
                    url
                    altText
                    height
                    width
                }
                handle
                id
                priceRangeV2 {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                tags
                title
            }
        }
    }
`