'use server';

import { TAGS } from "@/app/lib/constants";
import { addToCart, createCart, getCart, removeFromCart, updateCart } from "@/app/lib/shopify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
    let cartId = cookies().get('cartId')?.value;
    let cart;

    if(cartId) {
        cart = await getCart(cartId);
    }

    if(!cartId || !cart) {
        cart = await createCart();
        cartId = cart.id;
        cookies().set('cartId', cartId);
    }

    if(!selectedVariantId) {
        return 'Missing Product variant id';
    }

    try {
        await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
        revalidateTag(TAGS.cart);
    } catch (error) {
        return 'Error adding to cart';
    }
}

export async function removeItem(prevState: any, lineId: string) {
    const cartId = cookies().get('cartId')?.value;

    if(!cartId) {
        return 'Missing Cart ID';
    }

    try {
        await removeFromCart(cartId, [lineId]);
        revalidateTag(TAGS.cart);
    } catch (error) {
        return 'Error removing from cart';
    }
}

export async function updateItemQuantity(
    prevState: any,
    payload: {
        lineId: string,
        variantId: string,
        quantity: number
    }
) {
    const cartId = cookies().get('cartId')?.value;

    if(!cartId) {
        return 'Missing Cart ID';
    }

    const { lineId, variantId, quantity } = payload;

    try {
        if(quantity === 0) {
            await removeFromCart(cartId, [lineId]);
            revalidateTag(TAGS.cart);
            return;
        }

        await updateCart(cartId, [
            {
                id: lineId,
                merchandiseId: variantId,
                quantity
            }
        ]);
        revalidateTag(TAGS.cart);
    } catch (error) {
        return 'Error updating item quantity';
    }
}