import { blogResolver } from "./blog.resolver.js";

export const resolvers={
    Query:{
        ...blogResolver.Query
    }
}