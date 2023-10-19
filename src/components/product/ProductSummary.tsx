"use client"
import { Product } from '@/app/lib/types';
import React, { useState } from 'react';

const ProductSummary = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col pb-[10px]">
      <div className="pb-[15px]">
        <h1 className="text-lg font-light">{product.title}</h1>
      </div>
      <div>
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <ReadMoreLess text={product.description} maxChars={100} />
        </div>
      </div>
      <div className="flex flex-wrap pt-[15]px">
        <p className="text-lg font-light text-gray-900">
            {product.priceRange.maxVariantPrice.amount}
            {product.priceRange.maxVariantPrice.currencyCode}
        </p>
      </div>
    </div>
  );
};

const ReadMoreLess = ({ text, maxChars }: { text: string; maxChars: number }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const displayText = isReadMore ? text : text.slice(0, maxChars);

  return (
    <div>
      <p
        className={`text-base text-gray-900 font-light ${
            isReadMore ? 'text-ellipsis' : ''
          }`}
      >
        {displayText}
        {text.length > maxChars && (
            <button className="underline" onClick={toggleReadMore}>
            {isReadMore ? 'Read Less >' : 'Read More >'}
            </button>
        )}
      </p>
    </div>
  );
};

export default ProductSummary;
