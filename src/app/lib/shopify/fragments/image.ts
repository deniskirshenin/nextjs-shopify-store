import { gql } from "@/utils/gql";

const imageFragment = gql`
    fragment image on Image {
        altText
        height
        width
        id
        url
    }
`;

export default imageFragment;