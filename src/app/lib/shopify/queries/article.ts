import { gql } from "@/utils/gql";
import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";

export const articleFragment = gql`
    fragment article on Article {
        title
        authorV2 {
            name
        }
        content
        id
        image {
            ...image
        }
        publishedAt
        seo {
            ...seo
        }
        tags
        handle
        excerpt(truncateAt: 100)
        excerptHtml
    }
    ${imageFragment}
    ${seoFragment}
`;

export const getArticlesQuery = gql`
  query getArticles {
    blog(handle: "stories") {
      articles(first: 100) {
        edges {
          node {
            ...article
          }
        }
      }
    }
  }
  ${articleFragment}
`;


export const getArticleQuery = gql`
    query getArticle($handle:String!) {
        blog(handle: "stories") {
        articleByHandle(handle: $handle) {
            ...article
            }
        }
    }
    ${articleFragment}
`;