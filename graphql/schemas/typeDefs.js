import gql from "graphql-tag";
import { blogTypeDefs } from "./blog.typeDefs.js";
import { updatedBlogTypeDefs } from "./updateBlog.typeDefs.js";

export const typeDefs=gql `
    ${blogTypeDefs},
    ${updatedBlogTypeDefs}
`