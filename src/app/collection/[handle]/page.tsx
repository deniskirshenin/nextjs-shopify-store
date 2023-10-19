import { defaultSort, sorting } from "@/app/lib/constants";
import { getCollection, getCollectionProducts } from "@/app/lib/shopify";
import { ShopifyProduct } from "@/app/lib/types";
import ProductGrid from "@/components/ProductGrid";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params
  }: {
    params: { handle: string };
  }): Promise<Metadata> {
    console.log("params", params);
    console.log("HANDLE:", params.handle);
    const collection = await getCollection(params.handle);

    if(!collection) return notFound();

    return {
        title: collection.seo?.title || collection.title,
        description: collection.seo?.description || `${collection.title} Products`
    };
};

const CollectionPage = async ({
    params,
    searchParams,
    products
}: {
    params: { handle: string };
    searchParams: { [key: string]: string | string[] | undefined };
    products: ShopifyProduct[];
}
) => {
    const { sort } = searchParams as { [key: string]: string};
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
    const collectionProducts = await getCollectionProducts({ collection: params.handle, sortKey, reverse});
    return (
        <div>
          <ProductGrid products={collectionProducts} />
        </div>
    );
};

export default CollectionPage;