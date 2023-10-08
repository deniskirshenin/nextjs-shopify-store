import { getCollectionProducts } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductGrid = async () => {
    const products = await getCollectionProducts({
        collection: 'vans'
    });

    if (!products?.length) return null;

    return (
        <section className="flex flex-col p-14 justify-center">
            <span className="text-base font-semibold text-center pb-1">FEATURED</span>
            <h2 className="text-[54px] leading-[58px] font-medium text-center w-[880px] self-center pb-4">Create your dream shop in a glance with SHOPR theme.</h2>
            <p className="text-[18px] leading-[30px] text-center w-[540px] self-center">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product, i) => (
                    <li
                        className="spect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"
                        key={`${product.handle}${i}`}>
                        <Link href={`/product/${product.handle}`} className="relative h-full w-full">
                            <Image src={product.featuredImage.url} alt={product.featuredImage.altText} width={300} height={150} />
                            <h2>{product.title}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ProductGrid;