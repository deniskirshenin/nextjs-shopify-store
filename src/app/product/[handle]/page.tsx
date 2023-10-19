import { getProduct } from "@/app/lib/shopify";
import ProductPage from "@/components/product/ProductPage";
import ProductVariants from "@/components/product/ProductVariants";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: {handle: string}
}) {
  console.log("params", params);
    const handle = params.handle;
    console.log("HANDLE:", handle);
    const collection = await getProduct(handle);

    if(!collection) return notFound();
};

const SingleProductPage = async ({
  params
}: {
  params: {handle: string}
}) => {

  const product = await getProduct(params.handle);
  console.log(product);

  if (!product) {
    return notFound(); // Handle the not-found case
  }
  return (
    <ProductPage product={product} />
  );
};

export default SingleProductPage;