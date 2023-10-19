import { getCollectionProducts } from '@/app/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/app/lib/types';

const ProductGrid = async () => {
    const products = await getCollectionProducts({
        collection: 'vans'
    });

    if (!products?.length) return null;

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-0">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;