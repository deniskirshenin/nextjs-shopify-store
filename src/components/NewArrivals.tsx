import { productsShopify } from '@/utils';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewArrivals = async () => {
    const json = await productsShopify();
    return (
        <div className="py-14 pl-14 overflow-x-auto">
            <h2 className="font-medium text-4xl mb-8">New Arrivals:</h2>
            <ul className="flex gap-4 pb-12">
            {json.data.products.nodes.map((product) => {
            const prodId = product.id.split("/").pop();

            return (
                <li
                key={product.id}
                className="relative aspect-square h-full w-2/3 max-w-[475px] flex-none md:w-1/3"
                >
                <div>
                    <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                    className="h-[420px] w-full object-cover"
                    placeholder="blur"
                    blurDataURL={product.featuredImage.url}
                    />
                </div>

                <div className="p-5">
                    {product.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-yellow-400 font-bold py-1 px-3 rounded-full text-xs"
                    >
                        {tag}
                    </span>
                    ))}

                    <h3 className="font-medium mt-3 text-3xl">{product.title}</h3>

                    <h4>
                    {formatPrice(product.priceRangeV2.minVariantPrice.amount)}{" "}
                    {product.priceRangeV2.minVariantPrice.currencyCode}
                    </h4>

                    <p className="mt-2 mb-4">{product.description}</p>

                    <Link
                    href={`/product/${prodId}`}
                    className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
                    >
                    View Product
                    </Link>
                </div>
                </li>
            );
            })}
            </ul>
        </div>
  )
};

export default NewArrivals;