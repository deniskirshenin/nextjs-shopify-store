import { productsShopify } from '@/utils';
import Image from 'next/image';
import React from 'react';

const ProductGrid = async () => {
    const json = await productsShopify();
    console.log(json);

    return (
        <section className="grid p-14">
            <div className="flex flex-col pb-14">
                <span className="text-center text-base font-semibold mb-1">FEATURED</span>
                <h2 className="text-center font-medium text-[54px] leading-[58px] w-[880px] mx-auto mb-4">Create your dream shop in a glance with SHOPR theme.</h2>
                <p className="text-center font-normal text-[18px] leading-[30px] w-[540px] mx-auto">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.</p>
            </div>
            <ul className="grid grid-cols-12 gap-x-8 gap-y-[56px]">
                {json.data.products.nodes.map((product) => {
                    const prodId = product.id.split("/").pop();

                    return (
                        <li 
                            key={product.id} 
                            className="flex flex-col col-span-4 gap-y-[12px]">
                                <Image 
                                    src={product.featuredImage.url}
                                    alt={product.featuredImage.altText}
                                    width={product.featuredImage.width}
                                    height={product.featuredImage.height}
                                    className="h-[565px] w-full object-cover"
                                    placeholder="blur"
                                    blurDataURL={product.featuredImage.url}
                                />
                                <div className="flex flex-col">
                                    <h3>{product.title}</h3>
                                    <h4>
                                        {product.priceRangeV2.minVariantPrice.amount}{" "}
                                        {product.priceRangeV2.minVariantPrice.currencyCode}
                                        <del>{product.priceRangeV2.minVariantPrice.amount}</del>
                                    </h4>
                                </div>
                        </li>);
                })}
            </ul>
        </section>
    )
};

export default ProductGrid;