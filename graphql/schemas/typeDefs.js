import gql from "graphql-tag";
import { blogTypeDefs } from "./blog.typeDefs";

export const typeDefs=gql `
    ${blogTypeDefs}
`