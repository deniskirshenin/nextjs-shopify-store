import { defaultSort, sorting } from "@/app/lib/constants";
import { getCollection, getCollectionProducts } from "@/app/lib/shopify";
import { Product, ShopifyProduct } from "@/app/lib/types";
import ProductGrid from "@/components/ProductGrid";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: {handle: string};
    searchParams: { [key: string]: string | string[] | undefined };
    products: ShopifyProduct[];
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    console.log("params", params);
    const handle = params.handle;
    console.log("HANDLE:", handle);
    const collection = await getCollection(handle);

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
}: Props
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