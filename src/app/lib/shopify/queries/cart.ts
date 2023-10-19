import { gql } from "@/utils/gql";
import cartFragment from "../fragments/cart";

export const getCartQuery = gql`
    query getCart() {
        cart(id: $cartId) {
            ...cart
        }
    }
    ${cartFragment}
`;
