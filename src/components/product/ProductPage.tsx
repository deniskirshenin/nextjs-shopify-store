import React from 'react';
import ImageGallery from './ImageGallery'
import { Product } from '@/app/lib/types'
import ProductInfo from './ProductInfo'
import ProductNav from './ProductNav';

export default function ProductPage({product}: {product:Product}) {
  return (
    <section className="bg-white">
        <ProductNav />
        <section className="flex">
          <ImageGallery product={product}/>
          <ProductInfo product={product} />
        </section>
    </section>
  )
}