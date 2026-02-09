import { blogResolver } from "./blog.resolver";

export const resolvers={
    Query:{
        ...blogResolver.Query
    }
}