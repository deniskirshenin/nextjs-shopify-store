import { ShopifyExtension, ShopifyProduct } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { gql } from "@/utils/gql";
import Image from "next/image";

type GraphQLResponse = {
    data: {
      product: ShopifyProduct;
    };
    extensions: ShopifyExtension;
};

type SingleProductPageProps = {
    params: {
        id: string;
    };
};

const getProduct = async (id:string): Promise<GraphQLResponse> => {
    const response = await fetch(process.env.GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!
        },
        body: JSON.stringify({
            query: gql`
                query SingleProductQuery($id: ID!) {
                    product(id: $id) {
                        id
                        title
                        description
                        featuredImage {
                            id
                            url
                            altText
                            width
                            height
                        }
                        priceRangeV2 {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        tags
                    }
                }
            `,
            variables: {
                id: `gid://shopify/Product/${id}`
            }
        })
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
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
    const json = await getProduct(params.id);
    const { product } = json.data;

  return (
    <div className="container mx-auto md:pb-10">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:basis-1/2">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            placeholder="blur"
            blurDataURL={product.featuredImage.url}
          />
        </div>

        <div className="p-5 md:basis-1/2">
          {product.tags.map((tag) => (
            <span key={tag} className="bg-yellow-400 font-bold py-1 px-3 rounded-full text-xs">
              {tag}
            </span>
          ))}

          <h3 className="font-medium mt-3 text-3xl">{product.title}</h3>

          <h4>
            {formatPrice(product.priceRangeV2.minVariantPrice.amount)}{" "}
            {product.priceRangeV2.minVariantPrice.currencyCode}
          </h4>

          <p className="mt-2 mb-4">{product.description}</p>

          <button
            className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
            type="button"
          >
            Add to Cart
          </button>
          <span className="block mt-1 text-xs">* Note: this wont actually do anything</span>
        </div>
      </div>
      <div className="flex">
        <h3>You might also like</h3>
      </div>
    </div>
  );
};

export default SingleProductPage;