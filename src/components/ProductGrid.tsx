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
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <a key={product.id} href={`/product/${product.handle}`} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText}
                        width={product.featuredImage.width}
                        height={product.featuredImage.height}
                        className="h-full w-full object-content object-center group-hover:opacity-75"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.priceRange.maxVariantPrice.amount}</p>
                    </a>
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;