import gql from "graphql-tag";
import { blogTypeDefs } from "./blog.typeDefs.js";

export const typeDefs=gql `
    ${blogTypeDefs}
`