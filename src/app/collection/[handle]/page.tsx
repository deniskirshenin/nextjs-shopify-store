import { defaultSort, sorting } from "@/app/lib/constants";
import { getCollection, getCollectionProducts } from "@/app/lib/shopify";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: {handle: string};
    searchParams: { [key: string]: string | string[] | undefined };
}

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
    searchParams
}: Props
) => {
    const { sort } = searchParams as { [key: string]: string};
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
    const collectionProducts = await getCollectionProducts({ collection: params.handle, sortKey, reverse});
    return (
        <div>
            <ul className="flex flex-wrap gap-10">
            {collectionProducts.map((product, i) => (
              <li
                key={`${product.handle}${i}`}
                className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
              >
                <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                  <Image src={product.featuredImage.url} alt={product.featuredImage.altText} width={300} height={150} />
                  <h2>{product.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default CollectionPage;