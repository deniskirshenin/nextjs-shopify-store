import { gql } from "@/utils/gql";
import seoFragment from "../fragments/seo";

const pageFragment = gql`
    fragment page on Page {
        ... on Page {
            id
            title
            handle
            body
            seo {
                ...seo
            }
            bodySummary
            createdAt
            updatedAt
        }
    }
    ${seoFragment}
`;

export const getPageQuery = gql`
    query getPage($handle: String!) {
        page(handle: $handle) {
            ...page
        }
    }
    ${pageFragment}
`;

export const getPagesQuery = gql`
    query getPages {
        pages(first: 100) {
            edges {
                node {
                    ...page
                }
            }
        }
    }
    ${pageFragment}
`;