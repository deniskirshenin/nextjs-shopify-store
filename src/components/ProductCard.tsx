import { Product } from '@/app/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div key={product.id}>
        <Link href={`/product/${product.handle}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText}
                        width={product.featuredImage.width}
                        height={product.featuredImage.height}
                        className="h-full w-full object-content object-center group-hover:opacity-75"
                        />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 p-2">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900 p-2">{product.priceRange.maxVariantPrice.amount}</p>
        </Link>
    </div>
  );
};

export default ProductCard