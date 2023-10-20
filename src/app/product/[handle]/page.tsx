import { getProduct } from "@/app/lib/shopify";
import ProductPage from "@/components/product/ProductPage";
import { ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export const runtime = 'edge';
// const selectedOptions = [
//   { name: 'size', value: '8' },
//   { name: 'size', value: '9' },
// ];

export async function generateMetadata({
  params,
  searchParams
}: {
  params: {handle: string};
  searchParams: { [key: string]: string | string[] | undefined };
  parent: ResolvingMetadata
}) {
  console.log("params", params);
    const handle = params.handle;
    console.log("HANDLE:", handle);
  
    console.log("search params:", searchParams);
    
    const product = await getProduct(handle);

    if(!product) return notFound();
};

const SingleProductPage = async ({
  params,
  searchParams
}: {
  params: {handle: string};
  searchParams: { [key: string]: string | string[] | undefined };
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