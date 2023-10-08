import { getCollectionProducts } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewArrivals = async () => {
    const products = await getCollectionProducts({
        collection: 'ASICS-TIGER'
    });

    if (!products?.length) return null;

    return (
        <div className=" w-full p-14">
          <h2>New Arrivals</h2>
          <ul className="flex flex-wrap gap-4">
            {products.map((product, i) => (
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
    )
};

export default NewArrivals;