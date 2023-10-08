import { ShopifyExtension, ShopifyProduct } from "@/types";
import { gql } from "./gql";

type GraphQLResponse = {
    data: {
      products: {
        nodes: ShopifyProduct[];
      };
    };
    extensions: ShopifyExtension[];
}

export const productsShopify = async ():Promise<GraphQLResponse> => {
    const response = await fetch(process.env.GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
            query: gql`
            query ProductsQuery {
                products(first: 5) {
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
        }),
      });
    
      if (!response.ok) {
        const text = await response.text();
    
        throw new Error(`
          Failed to fetch data
          Status: ${response.status}
          Response: ${text}
        `);
      }
    
      return response.json();
};