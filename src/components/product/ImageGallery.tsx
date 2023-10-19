import { Product } from '@/app/lib/types';
import Image from 'next/image';
import React from 'react';

const ImageGallery = ({ product }: { product?: Product }) => {
  if (!product) {
    return null; // Or you can render a loading state or message
  }

  return (
    <div className="w-[60%]">
      <div className="flex flex-col mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {product.images[0] && (
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg bg-[#f1f1f1] lg:block">
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText}
              width={product.images[0].width}
              height={product.images[0].height}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {product.images[1] && (
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg bg-[#f1f1f1] lg:block">
              <Image
                src={product.images[1].url}
                alt={product.images[1].altText}
                width={product.images[1].width}
                height={product.images[1].height}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        )}

        {product.images[2] && (
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg bg-[#f1f1f1] lg:block">
            <Image
              src={product.images[2].url}
              alt={product.images[2].altText}
              width={product.images[2].width}
              height={product.images[2].height}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {product.images[3] && (
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg bg-[#f1f1f1] lg:block">
            <Image
              src={product.images[3].url}
              alt={product.images[3].altText}
              width={product.images[3].width}
              height={product.images[3].height}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
