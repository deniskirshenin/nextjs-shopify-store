"use client"
import React, { useState } from 'react';
import { Product, ProductOption, ProductVariant } from '@/app/lib/types';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createUrl } from '@/app/lib/utils';
import { AddToCart } from '../cart/AddToCart';

type Combination = {
    id: string;
    availableForSale: boolean;
    [key: string]: string | boolean;
};

export default function ProductVariants({
    options,
    variants,
    product,
  }: {
    product: Product;
    options: ProductOption[];
    variants: ProductVariant[];
  }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const hasNoOptionOrJustOneOption =  !options.length || (options.length === 1 && options[0]?.values.length === 1);
    
    if(hasNoOptionOrJustOneOption) {
        return null;
    };
    
    const combinations: Combination[] = variants.map((variant) => ({
        id: variant.id,
        availableForSale: variant.availableForSale,
        ...variant.selectedOptions.reduce(((accumulator, option) => ({
            ...accumulator,
            [option.name.toLocaleLowerCase()]: option.value
        })), {})
    }));


  
    return (
      <div className="mt-10">
        {/* Colors */}
        {options.map((option) => (
          <dl key={option.id}>
            <dt>{option.name}</dt>
            <dd className='flex gap-2'>
              {option.values.map((value) => {
                const optionNameToLowerCase = option.name.toLowerCase();
                const optionSearchParams = new URLSearchParams(searchParams.toString());
                optionSearchParams.set(optionNameToLowerCase, value);
                const optionUrl = createUrl(pathname, optionSearchParams);
                const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) => 
                    options.find((option) => option.name.toLowerCase() === key && option.values.includes(value)));
                const isAvailableForSale = combinations.find((combination) => 
                    filtered.every(
                        ([key, value]) => combination[key] === value && combination.availableForSale
                ));
                const isActive = searchParams.get(optionNameToLowerCase) === value;
                
                return (
                    <button
                        key={value}
                        aria-disabled={!isAvailableForSale}
                        disabled={!isAvailableForSale}
                        onClick={() => {
                            router.replace(optionUrl, {scroll: false})
                        }}
                        title={`${option.name} ${value}${!isAvailableForSale ? ' Out of stock' : ''}`}
                        className={clsx(
                            'flex flex-[1_1_10%] min-w-[48px] items-center justify-center rounded-md text-white border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                            {
                                'cursor-default ring-2 ring-blue-600': isActive,
                                'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                                !isActive && isAvailableForSale,
                                'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                                !isAvailableForSale
                            }
                        )}
                    >
                        {value}
                    </button>
                )
              })}
            </dd>
          </dl>
        ))}
        <AddToCart variants={product.variants} availableForSale={product.availableForSale as boolean} />
        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to bag
        </button>
      </div>
    );
  }








