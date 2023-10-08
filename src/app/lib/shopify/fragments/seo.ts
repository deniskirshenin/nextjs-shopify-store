import { gql } from "@/utils/gql";

const seoFragment = gql`
    fragment seo on SEO {
        description
        title
    }
`;

export default seoFragment;