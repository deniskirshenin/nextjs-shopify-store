import { gql } from "@/utils/gql";

export const getMenuQuery = gql`
    query getMenu {
        menu(handle: $handle) {
            items {
                title
                url
            }
        }
    }
`;