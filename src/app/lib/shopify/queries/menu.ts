import { gql } from "@/utils/gql";

export const getMenuQuery = gql`
    query getMenu($handle: String!) {
        menu(handle: $handle) {
            items {
                title
                url
            }
        }
    }
`;