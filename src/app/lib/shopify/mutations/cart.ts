import { gql } from "@/utils/gql";
import cartFragment from "../fragments/cart";

export const addToCartMutation = gql`
    mutation addToCart($cartId: ID!, $lines: [cartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
        ${cartFragment}
    }
`;

export const createCartMutation = gql`
    mutation createCart($cartId: ID!, $lines: [cartLineInput!]!) {
        cartCreate(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
        ${cartFragment}
    }
`;

export const editCartItemsMutation = gql`
    mutation editCartItems($cartId: ID!, $lines: [cartLineInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
        ${cartFragment}
    }
`;

export const removeFromCartMutation = gql`
    mutation removeFromCart($cartId: ID!, $lines: [cartLineInput!]!) {
        cartLinesRemove(cartId: $cartId, lines: $lines) {
            cart {
                ...cart
            }
        }
        ${cartFragment}
    }
`;